// import React from 'react';
// import Collapsible from 'react-collapsible';
// import { Projects, Project, ProjectQuery } from '../../@types/Interfaces';

// export interface IProps {
//     projects: Projects['projects'];
//     test: any;
// }

// // eslint-disable-next-line react/function-component-definition
// const Loger: React.FC<IProps> = ({ projects, test }) => (
//     <div>
//         <div>
//             {projects?.map((project: Project) => (
//                 <div aria-hidden="true" onClick={() => test(project)}>
//                     <Collapsible
//                         trigger={<span style={{ padding: '10px 50px' }}>{project.name}</span>}
//                         className="projectCard"
//                     >
//                         <div>
//                             {project.queries.map((query: ProjectQuery) => (
//                                 <div className="queryProps">
//                                     <div>
//                                         <div className="label">Name: </div>
//                                         <div className="value">{query.timestamp}</div>
//                                     </div>
//                                     <div>
//                                         <div className="label">Time: </div>
//                                         <div className="value">{query.timestamp}</div>
//                                     </div>
//                                     <div>
//                                         <div className="label">Depth: </div>
//                                         <div className="value">{query.depth}</div>
//                                     </div>
//                                     <div>
//                                         <div className="label">Complexity: </div>
//                                         <div className="value">{query.complexity}</div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </Collapsible>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// export default Loger;
export {};
