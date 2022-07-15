import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
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
    const [style, setStyle] = useState<ISState['style']>({
        time: false,
        depth: false,
        complexity: false,
    });
    const [arrow, setArrow] = useState<ISState['arrow']>({
        // adjusting arrow based on ascending vs descending
        timestamp: '',
        depth: '',
        complexity: '',
    });
    const [queries, setQueries] = useState<ProjectQuery[]>();

    const combinedSort = (field: keyof ISState['arrow'], sortOrder: SortOrder): void => {
        if (selectedProject && queries) {
            const newArr = [...queries];
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            // for (const key of queries!) {
            //     newArr.push(queries![key]);
            // }
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

    /**
     * Do not reder component if the GET_PROJECT_DATA query is still loading is still  or
     * if a project hasn't been selected fromm the tool bar
     * */
    if (projectLoading) return <Loading />;
    if (!selectedProject) return <div id="dashWrapper">Select a project</div>;

    /** Send query to get project information for this user */
    const { data, loading: queriesLoading } = useQuery(GET_QUERY_DATA, {
        variables: {
            projectId: selectedProject!.id,
        },
    });
    useEffect(() => {
        if (!queriesLoading && data) {
            setQueries(data.user.projects);
        }
    }, [queriesLoading, data]);

    /** if the GET_QUERY_DATA query is still loading return the loading component */
    if (queriesLoading) return <Loading />;
    return (
        <div id="dashWrapper">
            <div className="loggerBox">
                <div className="loggerSortButtonsWrapper">
                    <div className="loggerSortButtons">
                        {
                            // const Querries: React.FC<IProps> = ({ projects, test, sortByNameAsc, queries }) => (}
                        }
                        <div
                            aria-hidden="true"
                            className={`loggerBtn${style.time ? ' active' : ''}`}
                            onClick={() => {
                                // sortByTime();
                                let sortOrder: SortOrder;
                                if (arrow.timestamp === '' || arrow.timestamp === '↓') {
                                    sortOrder = '↑';
                                } else {
                                    sortOrder = '↓';
                                }

                                combinedSort('timestamp', sortOrder);
                                setToggle('time');
                            }}
                        >
                            Time {arrow.timestamp}
                        </div>
                        <div
                            aria-hidden="true"
                            className={`loggerBtn${style.depth ? ' active' : ''}`}
                            onClick={() => {
                                // sortByDepth();
                                let sortOrder: SortOrder;
                                if (arrow.depth === '' || arrow.depth === '↓') {
                                    sortOrder = '↑';
                                } else {
                                    sortOrder = '↓';
                                }
                                combinedSort('depth', sortOrder);
                                setToggle('depth');
                            }}
                        >
                            Depth {arrow.depth}
                        </div>
                        <div
                            aria-hidden="true"
                            className={`loggerBtn${arrow.complexity ? ' active' : ''}`}
                            onClick={() => {
                                // sortByComplexity();
                                let sortOrder: SortOrder;
                                if (arrow.complexity === '' || arrow.complexity === '↓') {
                                    sortOrder = '↑';
                                } else {
                                    sortOrder = '↓';
                                }
                                combinedSort('complexity', sortOrder);
                                setToggle('complexity');
                            }}
                        >
                            Complexity {arrow.complexity}
                        </div>
                    </div>
                </div>
                {/* <div
                    aria-hidden="true"
                    className={`loggerBtn${style.time ? ' active' : ''}`}
                    onClick={() => {
                        // sortByTime();
                        let sortOrder: SortOrder;
                        if (arrow.timestamp === '' || arrow.timestamp === '↓') {
                            sortOrder = '↑';
                        } else {
                            sortOrder = '↓';
                        }

                        combinedSort('timestamp', sortOrder);
                        setToggle('time');
                    }}
                >
                    Time {arrow.timestamp}
                </div>
                <div
                    aria-hidden="true"
                    className={`loggerBtn${style.depth ? ' active' : ''}`}
                    onClick={() => {
                        // sortByDepth();
                        let sortOrder: SortOrder;
                        if (arrow.depth === '' || arrow.depth === '↓') {
                            sortOrder = '↑';
                        } else {
                            sortOrder = '↓';
                        }
                        combinedSort('depth', sortOrder);
                        setToggle('depth');
                    }}
                >
                    Depth {arrow.depth}
                </div>
                <div
                    aria-hidden="true"
                    className={`loggerBtn${style.complexity ? ' active' : ''}`}
                    onClick={() => {
                        // sortByComplexity();
                        let sortOrder: SortOrder;
                        if (arrow.complexity === '' || arrow.complexity === '↓') {
                            sortOrder = '↑';
                        } else {
                            sortOrder = '↓';
                        }
                        combinedSort('complexity', sortOrder);
                        setToggle('complexity');
                    }}
                >
                    Complexity {arrow.complexity}
                </div> */}
                <div className="loggerGUI">
                    {/* <Logger test={test} projects={projects} /> */}
                    {/* <Querries queries={queries} sortByNameAsc={sortByNameAsc} test={test} projects={projects} /> */}
                    <Queries
                        // arrowTime={arrow.timestamp}
                        // arrowDepth={arrow.depth}
                        // arrowComplexity={arrow.complexity}
                        // time={style.time}
                        // depth={style.depth}
                        // complexity={style.complexity}
                        // setToggle={setToggle}
                        queries={queries}
                        // combinedSort={combinedSort}
                        // sortByTime={sortByTime}
                        // sortByDepth={sortByDepth}
                        // sortByComplexity={sortByComplexity}
                    />
                </div>
            </div>
            <div className="chartBox">
                <ChartBox project={selectedProject} queries={queries} />
                {/* <Chart options={chartData?.options} series={chartData?.series} type="line" /> */}
            </div>
        </div>
    );
}
