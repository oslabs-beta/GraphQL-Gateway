import React from 'react';
import Loading from './Loading';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
}
export default function ToolBar({ projects, setSelectedProject, projectLoading }: ToolbarProps) {
    const handleSelectProject = (e: any) => {
        setSelectedProject(projects![e.target.id]);
    };
    if (projectLoading)
        return (
            <div id="toolBar">
                <div id="toolBarMenu">Projects</div>
                <Loading />
            </div>
        );
    return (
        <div id="toolBar">
            <div id="toolBarMenu">
                This will be a menu of all the projects the user has list by name. User can select a
                project to dispaly. The tool will be able to toggle in and out{' '}
            </div>
            {projects?.map((project, index) => (
                <button
                    className="projectButton"
                    id={`${index}`}
                    type="button"
                    onClick={(e) => handleSelectProject(e)}
                >
                    {project.name}
                </button>
            ))}
        </div>
    );
}
