import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { start } from 'repl';
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
}

const GET_QUERY_DATA = gql`
    query getQueryData($projectId: String!, $date: Float, $offset: Float) {
        projectQueries(id: $projectId, date: $date, offset: $offset) {
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

export default function ProjectView({ selectedProject, projectLoading }: ProjectViewProps) {
    /** State requirments for this component */
    const [queries, setQueries] = useState<ProjectQuery[]>([]);
    const [numberOfDaysToView, setNumberOfDaysToView] = useState<ChartSelectionDays>(7);
    const [previousDays, setPreviousDays] = useState<ChartSelectionDays | 0>(0);
    const [offset, setOffset] = useState(0);

    /** Get the query ready to get query information for this project */
    const startTime: number = new Date().valueOf() - numberOfDaysToView * 24 * 60 * 60 * 1000;
    const [getProjectQueries, { data, loading: queriesLoading }] = useLazyQuery(GET_QUERY_DATA);

    useEffect(() => {
        /** once the projects have loadend and a project has been selected, send the query to get queres for the project */
        if (!projectLoading && selectedProject) {
            if (numberOfDaysToView > previousDays) {
                getProjectQueries({
                    variables: {
                        projectId: selectedProject!.id,
                        date: startTime,
                        offset,
                    },
                });
            } else {
                setQueries(
                    queries.slice(
                        0,
                        queries.findIndex((el) => el.timestamp < startTime)
                    )
                );
            }
            setPreviousDays(numberOfDaysToView);
            setOffset(startTime);
        }
    }, [selectedProject, numberOfDaysToView]);
    useEffect(() => {
        /** Once the queries are done loading and there is data, set the queries in state */
        if (!queriesLoading && data) {
            setQueries(queries.concat(data.projectQueries));
        }
    }, [data]);
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
                            {' '}
                            <h3>Select a project</h3>
                        </div>
                    )}
                </div>
                ;
            </div>
        );
    if (projectLoading || !queries)
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
                <Queries rawQueries={queries} />
            </div>
            <div className="chartBox">
                <ChartBox
                    queries={queries}
                    numberOfDaysToView={numberOfDaysToView}
                    setNumberOfDaysToView={setNumberOfDaysToView}
                />
            </div>
        </div>
    );
}
