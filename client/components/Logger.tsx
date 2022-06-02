import React from 'react';
import { useQuery, gql } from '@apollo/client';

export interface ProjectQuery {
    id: string;
    name: string;
    projectID: string;
    depth: number;
    complexity: number;
    time: number;
}

export interface Project {
    id: string;
    userID: string;
    name: string;
    queries: [ProjectQuery];
    query: ProjectQuery;
}

export interface User {
    id: string;
    email: string;
    password: string;
    projects: [Project];
    project: Project;
}

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

function Loger() {
    const { data } = useQuery(GET_USER_DATA, {
        variables: {
            userId: '6286978e12716d47e6884194',
        },
    });
    console.log(data);
    return <div className="app">ayy</div>;
}

export default Loger;
