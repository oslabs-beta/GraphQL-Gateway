import React from 'react';
// import Collapsible from 'react-collapsible';
// import { Projects, Project, ProjectQuery } from './Interfaces';
import { ProjectQuery } from '../../@types/Interfaces';
import { SortOrder } from '../../@types/dashboard';
import Query from './Query';

export interface IProps {
    // projects: Projects['projects'];
    // test: any;
    // combinedSort: (field: 'timestamp' | 'depth' | 'complexity', sortOrder: SortOrder) => void;
    // arrowTime: string | undefined;
    // arrowDepth: string | undefined;
    // arrowComplexity: string | undefined;
    // setToggle: any;
    // time: boolean;
    // depth: boolean;
    // complexity: boolean;
    // sortByTime: any;
    // sortByDepth: any;
    // sortByComplexity: any;
    queries: ProjectQuery[] | undefined;
}
// eslint-disable-next-line react/function-component-definition
const Querries: React.FC<IProps> = ({
    // combinedSort,
    // arrowTime,
    // arrowDepth,
    // arrowComplexity,
    // setToggle,
    // time,
    // depth,
    // complexity,
    // sortByTime,
    // sortByDepth,
    // sortByComplexity,
    queries,
}) => (
    <div id="loggerBtnWrapper">
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
        <div className="space" />
        {queries?.map((query: ProjectQuery) => (
            <Query query={query} />
        ))}
    </div>
);

export default Querries;
