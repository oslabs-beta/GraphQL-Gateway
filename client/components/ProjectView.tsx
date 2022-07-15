import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
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
    query getQueryData($projectId: String!) {
        projectQueries(id: $projectId) {
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
    const [queries, setQueries] = useState<ProjectQuery[]>();

    /** Get the query ready to get query information for this project */
    const [getProjectQueries, { data, loading: queriesLoading }] = useLazyQuery(GET_QUERY_DATA);

    useEffect(() => {
        /** once the projects have loadend and a project has been selected, send the query to get queres for the project */
        if (!projectLoading && selectedProject) {
            getProjectQueries({
                variables: {
                    projectId: selectedProject!.id,
                },
            });
        }
        /** Once the queries are done loading and there is data, set the queries in state */
        if (!queriesLoading && data) {
            setQueries(data.projectQueries);
        }
    }, [queriesLoading, data, selectedProject, projectLoading]);

    /**
     * Do not reder component if the GET_PROJECT_DATA or GET_QUERY_DATA query is still loading or
     * if a project hasn't been selected fromm the tool bar
     * */
    if (!selectedProject)
        return (
            <div id="dashWrapper">
                <div className="loggerBox" />
                <div className="chartBox">Select a project</div>;
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
                <ChartBox queries={queries} />
            </div>
        </div>
    );
}
