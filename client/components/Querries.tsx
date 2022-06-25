import React from 'react';
import Collapsible from 'react-collapsible';
// import { Projects, Project, ProjectQuery } from './Interfaces';
// import { ProjectQuery } from './Interfaces';

export interface IProps {
    // projects: Projects['projects'];
    // test: any;
    sortByTimeAsc: any;
    sortByTimeDesc: any;
    sortByDepthAsc: any;
    sortByDepthDesc: any;
    sortByComplexityAsc: any;
    sortByComplexityDesc: any;
    queries: ProjectQuery[] | undefined;
}

// eslint-disable-next-line react/function-component-definition
const Querries: React.FC<IProps> = ({
    sortByTimeAsc,
    sortByTimeDesc,
    sortByDepthAsc,
    sortByDepthDesc,
    sortByComplexityAsc,
    sortByComplexityDesc,
    queries,
}) => (
    // const Querries: React.FC<IProps> = ({ projects, test, sortByNameAsc, queries }) => (
    <div>
        <div>
            <div id="loggerBtnWrapper">
                <div aria-hidden="true" className="loggerBtn" onClick={() => sortByTimeAsc()}>
                    Time ↑
                </div>
                <div aria-hidden="true" className="loggerBtn" onClick={() => sortByTimeDesc()}>
                    Time ↓
                </div>
                <div aria-hidden="true" className="loggerBtn" onClick={() => sortByDepthAsc()}>
                    Depth ↑
                </div>
                <div aria-hidden="true" className="loggerBtn" onClick={() => sortByDepthDesc()}>
                    Depth ↓
                </div>
                <div aria-hidden="true" className="loggerBtn" onClick={() => sortByComplexityAsc()}>
                    Complexity ↑
                </div>
                <div
                    aria-hidden="true"
                    className="loggerBtn"
                    onClick={() => sortByComplexityDesc()}
                >
                    Complexity ↓
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
