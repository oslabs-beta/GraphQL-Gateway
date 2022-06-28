import React from 'react';
// import Collapsible from 'react-collapsible';
// import { Projects, Project, ProjectQuery } from './Interfaces';
import { ProjectQuery } from './Interfaces';

export interface IProps {
    // projects: Projects['projects'];
    // test: any;
    arrowTime: string | undefined;
    arrowDepth: string | undefined;
    arrowComplexity: string | undefined;
    setToggle: any;
    time: boolean;
    depth: boolean;
    complexity: boolean;
    sortByTime: any;
    sortByDepth: any;
    sortByComplexity: any;
    queries: ProjectQuery[] | undefined;
}
// eslint-disable-next-line react/function-component-definition
const Querries: React.FC<IProps> = ({
    arrowTime,
    arrowDepth,
    arrowComplexity,
    setToggle,
    time,
    depth,
    complexity,
    sortByTime,
    sortByDepth,
    sortByComplexity,
    queries,
}) => (
    // const Querries: React.FC<IProps> = ({ projects, test, sortByNameAsc, queries }) => (
    <div>
        <div>
            <div id="loggerBtnWrapper">
                <div
                    aria-hidden="true"
                    className={`loggerBtn${time ? ' active' : ''}`}
                    onClick={() => {
                        sortByTime();
                        setToggle('time');
                    }}
                >
                    Time {arrowTime}
                </div>
                <div
                    aria-hidden="true"
                    className={`loggerBtn${depth ? ' active' : ''}`}
                    onClick={() => {
                        sortByDepth();
                        setToggle('depth');
                    }}
                >
                    Depth {arrowDepth}
                </div>
                <div
                    aria-hidden="true"
                    className={`loggerBtn${complexity ? ' active' : ''}`}
                    onClick={() => {
                        sortByComplexity();
                        setToggle('complexity');
                    }}
                >
                    Complexity {arrowComplexity}
                </div>
            </div>
            {/* {projects?.map((project: Project) => (
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
                        <div>
                            <div className="label">Name: </div>
                            <div className="value">/</div>
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
                </div>
            ))}
        </div>
    </div>
);

export default Querries;
