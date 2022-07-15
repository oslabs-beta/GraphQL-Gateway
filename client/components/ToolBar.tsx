import React from 'react';
import Loading from './Loading';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
}
export default function ToolBar({ projects, setSelectedProject, projectLoading }: ToolbarProps) {
    /** Allow users to select a project from a list and have the data for that proejct dispaly in the project view */
    const handleSelectProject = (e: any) => {
        setSelectedProject(projects![e.target.id]);
    };

    /** render the toolbar
     * while the GET_PROJECT_DATA query is loading, render the loading component
     * instead of the project list */
    return (
        <div id="toolBar">
            {/** //ToDo: make the tool bar look nice. 
                   -toggle in and out from the right hand side. 
                   - sylethe project buttons */}
            <div id="toolBarMenu">
                This will be a menu of all the projects the user has list by name. User can select a
                project to dispaly. The tool will be able to toggle in and out{' '}
            </div>
            {projectLoading ? (
                <Loading />
            ) : (
                projects?.map((project, index) => (
                    <button
                        className="projectButton"
                        id={`${index}`}
                        type="button"
                        onClick={(e) => handleSelectProject(e)}
                    >
                        {project.name}
                    </button>
                ))
            )}
        </div>
    );
}
