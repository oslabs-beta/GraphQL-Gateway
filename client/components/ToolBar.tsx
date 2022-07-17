import React, { useState } from 'react';
import Loading from './Loading';
import ProjectItem from './ProjectItem';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
}
export default function ToolBar({ projects, setSelectedProject, projectLoading }: ToolbarProps) {
    /** State for the component */
    const [extended, setExtended] = useState(true);
    /** Allow users to select a project from a list and have the data for that proejct dispaly in the project view */
    // const handleSelectProject = (e: any) => {
    //     setSelectedProject(projects![e.target.id]);
    // };

    /** render the toolbar
     * while the GET_PROJECT_DATA query is loading, render the loading component
     * instead of the project list */
    return (
        <div id="toolBar" style={extended === true ? { left: '0px' } : { left: '-340px' }}>
            {/** //ToDo: make the tool bar look nice. 
                   -toggle in and out from the right hand side. 
                   - sylethe project buttons */}

            <button
                className="fa-solid fa-bars fa-2xl"
                type="button"
                aria-label="switch"
                onClick={() => setExtended(extended !== true)}
            />
            <div id="toolBarMenu">
                Projects{' '}
                {projectLoading ? (
                    <Loading />
                ) : (
                    <>
                        {projects?.map((project) => (
                            <ProjectItem
                                project={project}
                                setSelectedProject={setSelectedProject}
                                setExtended={setExtended}
                            />
                        ))}
                        <button type="button">Create a new Project</button>
                    </>
                )}
            </div>
        </div>
    );
}
