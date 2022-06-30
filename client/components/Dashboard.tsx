import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import ChartBox from './ChartBox';
import { Projects, SelectedProject, ProjectQuery } from './Interfaces';
import { SortOrder } from '../../@types/dashboard';
import Queries from './Querries';

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

function Dashboard() {
    const [style, setStyle] = useState<ISState['style']>({
        time: false,
        depth: false,
        complexity: false,
    });
    // const [order, setOrder] = useState<boolean>(); // ascending vs descending on click
    const [arrow, setArrow] = useState<ISState['arrow']>({
        // adjusting arrow based on ascending vs descending
        timestamp: '',
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
    const [setProject, selectProject] = useState<SelectedProject['project']>();
    const [queries, setQueries] = useState<ProjectQuery[]>();

    // const test = (pr: any): void => { // this is poorly named fuction that selects the project
    //     selectProject(pr);
    // };

    // sorting functions

    // enum Direction {
    //     Up = 'UP',
    //     Down = 'DOWN',
    //     Left = 'LEFT',
    //     Right = 'RIGHT',
    // }

    const combinedSort = (field: keyof ISState['arrow'], sortOrder: SortOrder): void => {
        // if (ascending === true) {
        //     setOrder(false);
        //     setArrow({
        //         ...arrow,
        //         time: '↑',
        //         depth: '',
        //         complexity: '',
        //     });
        // } else {
        //     setOrder(true);
        //     setArrow({
        //         ...arrow,
        //         time: '↓',
        //         depth: '',
        //         complexity: '',
        //     });
        // }
        // if (order) {
        if (setProject) {
            const newArr = [];
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in setProject?.queries) {
                newArr.push(setProject?.queries[key]);
            }
            newArr.sort((a, b) => {
                if (sortOrder === '↑') {
                    return b[field] - a[field];
                }
                if (sortOrder === '↓') {
                    return a[field] - b[field];
                }
                return 0;
            });
            setArrow({
                timestamp: '',
                depth: '',
                complexity: '',
                [field]: sortOrder,
            });
            setQueries(newArr);
        }
        // } else {
        //     const newArr = [];
        //     if (selectedProject) {
        //         // eslint-disable-next-line no-restricted-syntax, guard-for-in
        //         for (const key in selectedProject?.queries) {
        //             newArr.push(selectedProject?.queries[key]);
        //         }
        //     }
        //     const dataToSort = [...newArr];
        //     dataToSort.sort((a, b) => a.timestamp + b.timestamp);
        //     selectQuerries(dataToSort);
        // }
    };

    // const sortByTime = (): void => {
    //     if (order === true) {
    //         setOrder(false);
    //         // setArrow();
    //         setArrow({
    //             ...arrow,
    //             time: '↑',
    //             depth: '',
    //             complexity: '',
    //         });
    //     } else {
    //         setOrder(true);
    //         setArrow({
    //             ...arrow,
    //             time: '↓',
    //             depth: '',
    //             complexity: '',
    //         });
    //     }
    //     if (order) {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => a.timestamp - b.timestamp);
    //         setQueries(dataToSort);
    //     } else {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => a.timestamp + b.timestamp);
    //         setQueries(dataToSort);
    //     }
    // };
    // const sortByDepth = (): void => {
    //     if (order === true) {
    //         setOrder(false);
    //         setArrow({
    //             ...arrow,
    //             depth: '↑',
    //             time: '',
    //             complexity: '',
    //         });
    //     } else {
    //         setOrder(true);
    //         setArrow({
    //             ...arrow,
    //             depth: '↓',
    //             time: '',
    //             complexity: '',
    //         });
    //     }
    //     if (order) {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => a.depth - b.depth);
    //         setQueries(dataToSort);
    //     } else {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => b.depth - a.depth);
    //         setQueries(dataToSort);
    //     }
    // };
    // const sortByComplexity = (): void => {
    //     if (order === true) {
    //         setOrder(false);
    //         setArrow({
    //             ...arrow,
    //             complexity: '↑',
    //             time: '',
    //             depth: '',
    //         });
    //     } else {
    //         setOrder(true);
    //         setArrow({
    //             ...arrow,
    //             complexity: '↓',
    //             depth: '',
    //             time: '',
    //         });
    //     }
    //     if (order) {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => a.complexity - b.complexity);
    //         setQueries(dataToSort);
    //     } else {
    //         const newArr = [];
    //         if (selectedProject) {
    //             // eslint-disable-next-line no-restricted-syntax, guard-for-in
    //             for (const key in selectedProject?.queries) {
    //                 newArr.push(selectedProject?.queries[key]);
    //             }
    //         }
    //         const dataToSort = [...newArr];
    //         dataToSort.sort((a, b) => b.complexity - a.complexity);
    //         setQueries(dataToSort);
    //     }
    // };
    useEffect(() => {
        // if (!loadingR && dataR) {
        //     setProjects(dataR.user.projects);
        // }
        if (!loading && data) {
            selectProject(data.project);
            setQueries(setProject?.queries);
        }
    }, [loadingR, dataR, loading, data, setProject?.queries]);

    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerGUI">
                    {/* <Logger test={test} projects={projects} /> */}
                    {/* <Querries queries={queries} sortByNameAsc={sortByNameAsc} test={test} projects={projects} /> */}
                    <Queries
                        arrowTime={arrow.timestamp}
                        arrowDepth={arrow.depth}
                        arrowComplexity={arrow.complexity}
                        time={style.time}
                        depth={style.depth}
                        complexity={style.complexity}
                        setToggle={setToggle}
                        queries={queries}
                        combinedSort={combinedSort}
                        // sortByTime={sortByTime}
                        // sortByDepth={sortByDepth}
                        // sortByComplexity={sortByComplexity}
                    />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox project={setProject} />
            </div>
        </div>
    );
}

export default Dashboard;
