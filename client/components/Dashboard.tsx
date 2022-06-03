import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Logger from './Logger';
import ChartBox from './ChartBox';
import { Projects, SelectedProject } from './Interfaces';

const GET_USER_DATA = gql`
    query getUserData($userId: String!) {
        user(id: $userId) {
            email
            password
            projects {
                id
                userID
                name
                queries {
                    id
                    projectID
                    name
                    complexity
                    depth
                    time
                }
            }
        }
    }
`;

const GET_PROJECT = gql`
    query Query($projectId: String!) {
        project(id: $projectId) {
            id
            queries {
                time
                depth
                complexity
            }
        }
    }
`;

function Dashboard() {
    const { data: dataR, loading: loadingR } = useQuery(GET_USER_DATA, {
        variables: {
            userId: '6286978e12716d47e6884194',
        },
    });
    const { data, loading } = useQuery(GET_PROJECT, {
        variables: {
            projectId: '628e864e76cdbbec53f36010',
        },
    });

    const [projects, setProjects] = useState<Projects['projects']>();
    const [selectedProject, selectProject] = useState<SelectedProject['project']>();

    const test = (pr: any): void => {
        selectProject(pr);
    };

    useEffect(() => {
        if (!loadingR && dataR) {
            setProjects(dataR.user.projects);
        }
        if (!loading && data) {
            selectProject(data.project);
        }
    }, [loadingR, dataR, loading, data]);

    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerGUI">
                    <Logger test={test} projects={projects} />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox project={selectedProject} />
            </div>
        </div>
    );
}

export default Dashboard;
