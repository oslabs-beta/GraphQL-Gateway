import React from 'react';
// import Collapsible from 'react-collapsible';
// import { Projects, Project, ProjectQuery } from './Interfaces';
import { ProjectQuery } from './Interfaces';
import { SortOrder } from '../../@types/dashboard';

export interface IProps {
    // projects: Projects['projects'];
    // test: any;
    combinedSort: (field: 'timestamp' | 'depth' | 'complexity', sortOrder: SortOrder) => void;
    arrowTime: string | undefined;
    arrowDepth: string | undefined;
    arrowComplexity: string | undefined;
    setToggle: any;
    time: boolean;
    depth: boolean;
    complexity: boolean;
    // sortByTime: any;
    // sortByDepth: any;
    // sortByComplexity: any;
    queries: ProjectQuery[] | undefined;
}
// eslint-disable-next-line react/function-component-definition
const Querries: React.FC<IProps> = ({
    combinedSort,
    arrowTime,
    arrowDepth,
    arrowComplexity,
    setToggle,
    time,
    depth,
    complexity,
    // sortByTime,
    // sortByDepth,
    // sortByComplexity,
    queries,
}) => (
    <div id="loggerBtnWrapper">
        <div className="querriesList">
            {
                // const Querries: React.FC<IProps> = ({ projects, test, sortByNameAsc, queries }) => (}
            }
            <div
                aria-hidden="true"
                className={`loggerBtn${time ? ' active' : ''}`}
                onClick={() => {
                    // sortByTime();
                    let sortOrder: SortOrder;
                    if (arrowTime === '' || arrowTime === '↓') {
                        sortOrder = '↑';
                    } else {
                        sortOrder = '↓';
                    }

                    combinedSort('timestamp', sortOrder);
                    setToggle('time');
                }}
            >
                Time {arrowTime}
            </div>
            <div
                aria-hidden="true"
                className={`loggerBtn${depth ? ' active' : ''}`}
                onClick={() => {
                    // sortByDepth();
                    let sortOrder: SortOrder;
                    if (arrowDepth === '' || arrowDepth === '↓') {
                        sortOrder = '↑';
                    } else {
                        sortOrder = '↓';
                    }
                    combinedSort('depth', sortOrder);
                    setToggle('depth');
                }}
            >
                Depth {arrowDepth}
            </div>
            <div
                aria-hidden="true"
                className={`loggerBtn${complexity ? ' active' : ''}`}
                onClick={() => {
                    // sortByComplexity();
                    let sortOrder: SortOrder;
                    if (arrowComplexity === '' || arrowComplexity === '↓') {
                        sortOrder = '↑';
                    } else {
                        sortOrder = '↓';
                    }
                    combinedSort('complexity', sortOrder);
                    setToggle('complexity');
                }}
            >
                Complexity {arrowComplexity}
            </div>
        </div>
        {/* -------this is left for the future project implementation. Waiting for instruction
                {projects?.map((project: Project) => (
                <div aria-hidden="true" onClick={() => test(project)}>
                    <Collapsible
                        trigger={<span style={{ padding: '10px 50px' }}>{project.name}</span>}
                        className="projectCard"
                    >
                        <div>
                            {project.queries.map((query: ProjectQuery) => (
                                <div className="queryProps">
                                    <div>
                                        <div className="label">Name: </div>
                                        <div className="value">{query.name}</div>
                                    </div>
                                    <div>
                                        <div className="label">Time: </div>
                                        <div className="value">{query.time}</div>
                                    </div>
                                    <div>
                                        <div className="label">Depth: </div>
                                        <div className="value">{query.depth}</div>
                                    </div>
                                    <div>
                                        <div className="label">Complexity: </div>
                                        <div className="value">{query.complexity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Collapsible>
                </div>
            ))} */}
        {queries?.map((query: ProjectQuery) => (
            <div>
                <div className="queryProps">
                    {/* number still missing */}
                    {/* <div>
                            <div className="label">Number: </div>
                            <div className="value">{query.number}</div>
                        </div> */}
                    <div>
                        <div className="label">Time: </div>
                        <div className="value">{query.timestamp}</div>
                    </div>
                    <div>
                        <div className="label">Depth: </div>
                        <div className="value">{query.depth}</div>
                    </div>
                    <div>
                        <div className="label">Complexity: </div>
                        <div className="value">{query.complexity}</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Querries;
