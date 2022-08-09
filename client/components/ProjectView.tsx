import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Queries from './Queries';
import ChartBox from './ChartBox';
import Loading from './Loading';

export interface ISState {
    style: {
        time: boolean; // TODO: Change to timestamp
        depth: boolean;
        complexity: boolean;
    };
    arrow: {
        timestamp: SortOrder;
        depth: SortOrder;
        complexity: SortOrder;
    };
}

interface ProjectViewProps {
    selectedProject: Project | undefined;
    projectLoading: boolean;
    rateLimiterQueries: ProjectQuery[];
}

const GET_QUERY_DATA = gql`
    query getQueryData($projectId: String!, $minDate: Float, $maxDate: Float) {
        projectQueries(id: $projectId, minDate: $minDate, maxDate: $maxDate) {
            id
            number
            latency
            complexity
            loggedOn
            depth
            timestamp
            tokens
            success
        }
    }
`;

const DEFAULT_DAYS = 365; // FIXME: Replace with 7
const MS_IN_DAY = 24 * 60 * 60 * 1000;

export default function ProjectView({
    selectedProject,
    projectLoading,
    rateLimiterQueries,
}: ProjectViewProps) {
    // Lookback perioud for query data. DEFAULT to 1 week
    const [numberOfDaysToView, setNumberOfDaysToView] = useState<ChartSelectionDays>(DEFAULT_DAYS);
    // The previous lookback period
    const [previousDays, setPreviousDays] = useState<ChartSelectionDays | 0>(0);

    // Tracks the timestamp of the last time we fetched queries
    const [lastFetchDate, setLastFetchDate] = useState<number>(0);

    // Track the earliest date for which we've fetched a query. We only need to fetch historical data once
    const [earliestQueryDate, setEarliestQueryDate] = useState<number>(0);

    // These are the queries rendered by the presentational <Queries> and <Chart> components
    // FIXME: This is redundant state that can be obtained by splicing raw or rateLimitedQueries
    const [visibleQueries, setVisibleQueries] = useState<ProjectQuery[]>([]);

    // Raw query data without updated rate limiter settings or paginated for view
    const [rawQueries, setRawQueries] = useState<ProjectQuery[]>([]);

    const [getProjectQueries, { loading: queriesLoading }] = useLazyQuery(GET_QUERY_DATA);

    const fetchQueryData = async (projectId: string, minDate: number, maxDate: number) =>
        getProjectQueries({
            variables: {
                projectId,
                minDate,
                maxDate,
            },
        });

    // Fetch query data whenever the project changes and reset the default lookback period.
    useEffect(() => {
        (async () => {
            // FIXME: check if component is mounted prior to state updates

            if (selectedProject) {
                const currentTime = new Date().valueOf();
                // Earliest date for which queries should be fetched
                const startDate: number = currentTime - DEFAULT_DAYS * MS_IN_DAY;
                setNumberOfDaysToView(DEFAULT_DAYS);
                setLastFetchDate(currentTime);
                setEarliestQueryDate(startDate);

                // The project has changed refetch query data for this project
                const { data } = await fetchQueryData(selectedProject.id, startDate, currentTime);
                // TODO: Error handling
                // Display these queries and clear rate limited queries
                setVisibleQueries(data.projectQueries);
                setRawQueries(data.projectQueries);
            }
        })();
    }, [selectedProject]);

    // Fetch new queries and reslice the data whenever the number of days to view changes
    // to minimize delay and ease computation costs rateLimiterQueries are only viewed historically
    // new queries will not be fectched. The purpose of this is to view the effect on historical data
    // and not monitor incoming data.
    useEffect(() => {
        (async () => {
            // FIXME: check if component is mounted prior to state updates

            if (!selectedProject) return;

            const currentTime = new Date().valueOf();
            const cutoffDate = currentTime - numberOfDaysToView * MS_IN_DAY;

            if (rateLimiterQueries.length > 0) {
                setVisibleQueries(
                    // Sort queries by timestamp and filter for current view
                    rateLimiterQueries
                        .filter((a: ProjectQuery) => a.timestamp > cutoffDate)
                        .sort((a: ProjectQuery, b: ProjectQuery) => a.timestamp - b.timestamp)
                );
            } else {
                // Fetch any queries that have come in since the last time we fetched
                const { data: newQueries } = await fetchQueryData(
                    selectedProject.id,
                    lastFetchDate,
                    currentTime
                );
                setLastFetchDate(currentTime);

                // If new number of days is greater then we need to fetch older queries as well
                if (numberOfDaysToView > previousDays) {
                    // Only fetch queries if we haven't gotten them already
                    const earliestQueryNeeded = currentTime - numberOfDaysToView * MS_IN_DAY;

                    let olderQueries: ProjectQuery[] = [];

                    if (earliestQueryNeeded < earliestQueryDate) {
                        olderQueries = await fetchQueryData(
                            selectedProject.id,
                            earliestQueryNeeded,
                            lastFetchDate - previousDays * MS_IN_DAY
                        ).then(({ data }) => data.projectQueries || []);
                    }
                    // merge this data into the rawData
                    // TODO: Toggling this back and forth will add repeats
                    const updatedQueries = [...olderQueries, ...rawQueries, ...newQueries];

                    // TODO: Merge with Rate limited queries if custom limiter is configured

                    setVisibleQueries(
                        // Sort queries by timestamp and filter for current view
                        updatedQueries
                            .filter((a: ProjectQuery) => a.timestamp > cutoffDate)
                            .sort((a: ProjectQuery, b: ProjectQuery) => a.timestamp - b.timestamp)
                    );
                    setRawQueries(updatedQueries);
                } else {
                    // we add new queries then drop any queries outside the window

                    // Otherwise user wants to view less data so just slice the visible data
                    setVisibleQueries(
                        [...visibleQueries, ...rawQueries, ...newQueries]
                            .filter((a: ProjectQuery) => a.timestamp > cutoffDate)
                            .sort((a: ProjectQuery, b: ProjectQuery) => a.timestamp - b.timestamp)
                    );
                }
            }
        })();
    }, [numberOfDaysToView]);

    // Update visible queries whenever rateLimiterQueries changes
    useEffect(() => {
        const currentTime = new Date().valueOf();
        const cutoffDate = currentTime - numberOfDaysToView * MS_IN_DAY;

        const newVisibleQueries = rateLimiterQueries.length > 0 ? rateLimiterQueries : rawQueries;

        setVisibleQueries(
            [...newVisibleQueries]
                .filter((a: ProjectQuery) => a.timestamp > cutoffDate)
                .sort((a: ProjectQuery, b: ProjectQuery) => a.timestamp - b.timestamp)
        );
    }, [rateLimiterQueries]);

    const handleDayChange = (newDays: ChartSelectionDays) => {
        setPreviousDays(numberOfDaysToView);
        setNumberOfDaysToView(newDays);
    };

    /**
     * There are 3 states to the project view
     *  1. no project selected - render a shell of the project view with a "Select a Project Prompt"
     *  2. projects or queries are loading - render a shell of the  project view with a loading component
     *  3. project selected and queries loaded - render the querues and chart
     * */
    if (!selectedProject || projectLoading)
        return (
            <div id="dashWrapper">
                <div className="loggerBox" />
                <div className="chartBox">
                    {projectLoading ? (
                        <Loading />
                    ) : (
                        <div id="loading">
                            <h3>Select a project</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    if (queriesLoading || !visibleQueries)
        return (
            <div id="dashWrapper">
                <div className="loggerBox" />
                <div className="chartBox">
                    <Loading />
                </div>
                ;
            </div>
        );

    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <Queries rawQueries={visibleQueries} />
            </div>
            <div className="chartBox">
                <ChartBox
                    queries={visibleQueries}
                    numberOfDaysToView={numberOfDaysToView}
                    setNumberOfDaysToView={handleDayChange}
                />
            </div>
        </div>
    );
}
