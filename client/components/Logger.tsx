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

export interface Data {
    user: User;
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
    const { data }: { data: Data | undefined } = useQuery(GET_USER_DATA, {
        variables: {
            userId: '6286978e12716d47e6884194',
        },
    });

    // eslint-disable-next-line array-callback-return
    data?.user.projects.map((el: Project): void => {
        console.log('el', typeof el);
    });

    return (
        // <div>aaa</div>
        <div>
            <div>
                {data?.user.projects.map((project) => (
                    <div className="projectCard">
                        <div>Project name: {project.name}</div>
                        <div />
                        <hr id="cardHr" />
                        {project.queries.map((query) => (
                            <>
                                <div>Name: {query.name}</div>
                                <div>Time: {query.time}</div>
                                <div>Depth: {query.depth}</div>
                                <div>Complexity: {query.complexity}</div>
                            </>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loger;
