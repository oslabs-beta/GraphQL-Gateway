import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import { start } from 'repl';
import Queries from './Queries';
import ChartBox from './ChartBox';
import { SortOrder } from '../../@types/dashboard';
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
    const [days, setDays] = useState<1 | 7 | 30 | 365>(7);
    const [offset, setOffset] = useState(0);

    const setDaysFn = (param: number): any => {
        if (param === 1) {
            setDays(1);
        } else if (param === 7) {
            setDays(7);
        } else if (param === 30) {
            setDays(30);
        } else {
            setDays(365);
        }
    };

    /** Get the query ready to get query information for this project */
    const startTime: number = new Date().valueOf() - days * 24 * 60 * 60 * 1000;
    const [getProjectQueries, { data, loading: queriesLoading }] = useLazyQuery(GET_QUERY_DATA);

    useEffect(() => {
        /** once the projects have loadend and a project has been selected, send the query to get queres for the project */
        if (!projectLoading && selectedProject) {
            getProjectQueries({
                variables: {
                    projectId: selectedProject!.id,
                    date: startTime,
                    offset,
                    // date: 1655918025713,
                },
            });
            setOffset(startTime);
        }
    }, [selectedProject, days]);

    useEffect(() => {
        /** Once the queries are done loading and there is data, set the queries in state */
        if (!queriesLoading && data) {
            setQueries(queries.concat(data.projectQueries));
        }
        console.log('queries', data);
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
                    {projectLoading ? <Loading /> : <div id="loading"> Select a project</div>}
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
                <ChartBox queries={queries} setDaysFn={setDaysFn} />
            </div>
        </div>
    );
}
