import React, { useState } from 'react';
import Queries from './Queries';
import ChartBox from './ChartBox';
import { SortOrder, ChartData } from '../../@types/dashboard';

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

export default function ProjectView() {
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
                {/* <Chart options={chartData?.options} series={chartData?.series} type="line" /> */}
            </div>
        </div>
    );
}
