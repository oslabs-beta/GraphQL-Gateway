import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ProjectQuery } from '../../@types/Interfaces';
import { SortOrder } from '../../@types/dashboard';
import Query from './Query';

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

export interface IProps {
    rawQueries: ProjectQuery[];
}

// eslint-disable-next-line react/function-component-definition
const Queries: React.FC<IProps> = ({ rawQueries }) => {
    // "rawQueries" is the raw, unfilter array of queries. "listOfQueries" is the filter list
    const [listOfQueries, setListOfQueries] = useState(rawQueries);
    const [queryyy, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const handleChange = (e: any) => {
        setQuery(e.target.value);
    };

    const handleObserver = useCallback((entries: any) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    /** State requirments for this component */
    useEffect(() => {
        /** once the projects have loadend and a project has been selected, send the query to get queres for the project */
        setListOfQueries(rawQueries);
    }, [rawQueries]);

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
    /** Sort/filter the queries in the set the state of the filter arrows */
    const combinedSort = (field: keyof ISState['arrow'], sortOrder: SortOrder): void => {
        const newArr = [...listOfQueries];
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
        setListOfQueries(newArr);
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

    return (
        <>
            <div className="loggerSortButtonsWrapper">
                <div className="loggerSortButtons">
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
            <div className="loggerGUI">
                <div className="space" />
                <div id="loggerBtnWrapper">
                    {listOfQueries?.map((query: ProjectQuery) => (
                        <Query query={query} />
                    ))}
                </div>
                <p>Loading...</p>
                <div ref={loader} />
            </div>
        </>
    );
};

export default Queries;
