import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Logger from './Logger';
import ChartBox from './ChartBox';
import { Projects } from './Interfaces';

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

function Dashboard() {
    const { data, loading } = useQuery(GET_USER_DATA, {
        variables: {
            userId: '6286978e12716d47e6884194',
        },
    });

    // const [user, setUser] = useState<Data['user']>();
    const [projects, setProjects] = useState<Projects['projects']>();

    useEffect(() => {
        if (!loading && data) {
            setProjects(data.user.projects);
        }
    }, [loading, data]);

    console.log('these are users projects from Dashboard', projects);

    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerGUI">
                    <Logger projects={projects} />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox projects={projects} />
            </div>
        </div>
    );
}

export default Dashboard;
