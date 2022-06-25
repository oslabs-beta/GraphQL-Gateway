import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
// import Logger from './Logger';
// import Query from 'server/models/Query';
import ChartBox from './ChartBox';
import { Projects, SelectedProject } from './Interfaces';
import Querries from './Querries';

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
    const [queries, selectQuerries] = useState<ProjectQuery[]>();

    const test = (pr: any): void => {
        selectProject(pr);
    };
    const sortByTimeAsc = (): any => {
        console.log('this is queries', queries);
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => a.time - b.time);
        selectQuerries(dataToSort);
    };
    const sortByTimeDesc = (): any => {
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => a.time + b.time);
        selectQuerries(dataToSort);
    };
    const sortByDepthAsc = (): any => {
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => a.depth - b.depth);
        selectQuerries(dataToSort);
    };
    const sortByDepthDesc = (): any => {
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => b.depth - a.depth);
        selectQuerries(dataToSort);
    };
    const sortByComplexityAsc = (): any => {
        console.log('this is queries', queries);
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => a.complexity - b.complexity);
        selectQuerries(dataToSort);
    };
    const sortByComplexityDesc = (): any => {
        const newArr = [];
        if (selectedProject) {
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in selectedProject?.queries) {
                newArr.push(selectedProject?.queries[key]);
            }
        }
        const dataToSort = [...newArr];
        dataToSort.sort((a, b) => b.complexity - a.complexity);
        selectQuerries(dataToSort);
    };
    // const sortByNameDesc = (pr: any): void => {
    //     selectProject(pr);
    // };
    // const sortBySucess = (pr: any): void => {
    //     selectProject(pr);
    // };
    // const showLastDay = (pr: any): void => {
    //     selectProject(pr);
    // };
    // const showLastSevenDays = (pr: any): void => {
    //     selectProject(pr);
    // };
    // const showLastSixMonths = (pr: any): void => {
    //     selectProject(pr);
    // };
    // const showYTD= (pr: any): void => {
    //     selectProject(pr);
    // };

    useEffect(() => {
        if (!loadingR && dataR) {
            setProjects(dataR.user.projects);
        }
        if (!loading && data) {
            selectProject(data.project);
            selectQuerries(selectedProject?.queries);
        }
    }, [loadingR, dataR, loading, data, selectedProject?.queries]);

    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerGUI">
                    {/* <Logger test={test} projects={projects} /> */}
                    {/* <Querries queries={queries} sortByNameAsc={sortByNameAsc} test={test} projects={projects} /> */}
                    <Querries
                        queries={queries}
                        sortByTimeAsc={sortByTimeAsc}
                        sortByTimeDesc={sortByTimeDesc}
                        sortByDepthAsc={sortByDepthAsc}
                        sortByDepthDesc={sortByDepthDesc}
                        sortByComplexityAsc={sortByComplexityAsc}
                        sortByComplexityDesc={sortByComplexityDesc}
                    />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox project={selectedProject} />
            </div>
        </div>
    );
}

export default Dashboard;
