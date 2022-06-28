import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ChartBox from './ChartBox';
import { Projects, SelectedProject, ProjectQuery } from './Interfaces';
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
                    number
                    complexity
                    depth
                    timestamp
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
                timestamp
                depth
                complexity
            }
        }
    }
`;
// we are defining state types - arrow (for sorting arrow change when clicked -ascending or descending) and time,depth and complexity props of a query
export interface ISState {
    style: {
        time: boolean;
        depth: boolean;
        complexity: boolean;
    };
    arrow: {
        time: string;
        depth: string;
        complexity: string;
    };
}

function Dashboard() {
    const [style, setStyle] = useState<ISState['style']>({
        time: false,
        depth: false,
        complexity: false,
    });
    const [order, setOrder] = useState<boolean>(); // ascending vs descending on click
    const [arrow, setArrow] = useState<ISState['arrow']>({
        // adjusting arrow based on ascending vs descending
        time: '',
        depth: '',
        complexity: '',
    });
    // toggle classes on click in the Queries component
    const setToggle = (arg: string) => {
        if (arg === 'time') {
            setStyle({
                ...style,
                time: true,
                depth: false,
                complexity: false,
            });
        } else if (arg === 'depth') {
            setStyle({
                ...style,
                time: false,
                depth: true,
                complexity: false,
            });
        } else if (arg === 'complexity') {
            setStyle({
                ...style,
                time: false,
                depth: false,
                complexity: true,
            });
        }
    };
    // graphql calling
    const { data: dataR, loading: loadingR } = useQuery(GET_USER_DATA, {
        variables: {
            userId: '62ba5b743f40d18829e018a1',
        },
    });
    const { data, loading } = useQuery(GET_PROJECT, {
        variables: {
            projectId: '62ba5bd43f40d18829e018c4',
        },
    });

    // const [projects, setProjects] = useState<Projects['projects']>();   // commented out due to still not knowing how you guys want our project selection to look like. Waiting for instructions
    const [selectedProject, selectProject] = useState<SelectedProject['project']>();
    const [queries, selectQuerries] = useState<ProjectQuery[]>();

    // const test = (pr: any): void => { // this is poorly named fuction that selects the project
    //     selectProject(pr);
    // };

    // sorting functions

    const sortByTime = (): any => {
        if (order === true) {
            setOrder(false);
            // setArrow();
            setArrow({
                ...arrow,
                time: '↑',
                depth: '',
                complexity: '',
            });
        } else {
            setOrder(true);
            setArrow({
                ...arrow,
                time: '↓',
                depth: '',
                complexity: '',
            });
        }
        if (order) {
            const newArr = [];
            if (selectedProject) {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (const key in selectedProject?.queries) {
                    newArr.push(selectedProject?.queries[key]);
                }
            }
            const dataToSort = [...newArr];
            dataToSort.sort((a, b) => a.timestamp - b.timestamp);
            selectQuerries(dataToSort);
        } else {
            const newArr = [];
            if (selectedProject) {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (const key in selectedProject?.queries) {
                    newArr.push(selectedProject?.queries[key]);
                }
            }
            const dataToSort = [...newArr];
            dataToSort.sort((a, b) => a.timestamp + b.timestamp);
            selectQuerries(dataToSort);
        }
    };
    const sortByDepth = (): any => {
        if (order === true) {
            setOrder(false);
            setArrow({
                ...arrow,
                depth: '↑',
                time: '',
                complexity: '',
            });
        } else {
            setOrder(true);
            setArrow({
                ...arrow,
                depth: '↓',
                time: '',
                complexity: '',
            });
        }
        if (order) {
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
        } else {
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
        }
    };
    const sortByComplexity = (): any => {
        if (order === true) {
            setOrder(false);
            setArrow({
                ...arrow,
                complexity: '↑',
                time: '',
                depth: '',
            });
        } else {
            setOrder(true);
            setArrow({
                ...arrow,
                complexity: '↓',
                depth: '',
                time: '',
            });
        }
        if (order) {
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
        } else {
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
        }
    };
    useEffect(() => {
        // if (!loadingR && dataR) {
        //     setProjects(dataR.user.projects);
        // }
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
                        arrowTime={arrow.time}
                        arrowDepth={arrow.depth}
                        arrowComplexity={arrow.complexity}
                        time={style.time}
                        depth={style.depth}
                        complexity={style.complexity}
                        setToggle={setToggle}
                        queries={queries}
                        sortByTime={sortByTime}
                        sortByDepth={sortByDepth}
                        sortByComplexity={sortByComplexity}
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
