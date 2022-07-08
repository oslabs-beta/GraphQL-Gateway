import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router';
import ChartBox from './ChartBox';
import { SelectedProject, ProjectQuery } from './Interfaces';
import { SortOrder } from '../../@types/dashboard';
import Queries from './Queries';
import { useAuth } from '../auth/AuthProvider';

const GET_USER_DATA = gql`
    query getUserData($userId: String!) {
        user(id: $userId) {
            # note this curretnly gets all projects and queries. This could be a very expersive query.
            projects {
                name
                id
                queries {
                    number
                    latency
                    complexity
                    depth
                    timestamp
                    tokens
                    success
                }
            }
        }
    }
`;

// const GET_PROJECT = gql`
//     query Query($projectId: String!) {
//         project(id: $projectId) {
//             id
//             queries {
//                 timestamp
//                 depth
//                 complexity
//             }
//         }
//     }
// `;

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
    const { user } = useAuth();
    console.log(user);
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
    const { data, loading } = useQuery(GET_USER_DATA, {
        variables: {
            userId: user!.id,
        },
    });
    // const { data, loading } = useQuery(GET_PROJECT, {
    //     variables: {
    //         projectId: dataR.projects.id,
    //     },
    // });

    // const [projects, setProjects] = useState<Projects['projects']>();   // commented out due to still not knowing how you guys want our project selection to look like. Waiting for instructions
    const [setProject, selectProject] = useState<SelectedProject['project']>();
    const [queries, setQueries] = useState<ProjectQuery[]>();

    // const test = (pr: any): void => { // this is poorly named fuction that selects the project
    //     selectProject(pr);
    // };

    // sorting functions
    const combinedSort = (field: keyof ISState['arrow'], sortOrder: SortOrder): void => {
        if (setProject) {
            const newArr = [];
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const key in setProject?.queries) {
                newArr.push(setProject?.queries[key]);
            }
            newArr.sort((a, b) => {
                if (sortOrder === '↑') {
                    return a[field] - b[field];
                }
                if (sortOrder === '↓') {
                    return b[field] - a[field];
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
            console.log(data);
            selectProject(data.user.projects[0]);
            setQueries(setProject?.queries);
        }
    }, [/** loadingR, dataR, */ loading, data, setProject?.queries]);

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
