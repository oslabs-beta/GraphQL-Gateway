import React, { useState } from 'react';
import { Project } from '../../@types/Interfaces';

interface ProjectItemProps {
    project: Project;
    setSelectedProject: any;
    setExtended: any;
}

export default function ProjectItem({
    project,
    setSelectedProject,
    setExtended,
}: ProjectItemProps) {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <button
                className="projectButton"
                id={project.id}
                type="button"
                onClick={() => setDropdown(dropdown !== true)}
            >
                {project.name}
            </button>
            {dropdown && (
                <div className="projectContent">
                    <div className="apiDiv">
                        <b>API Key:</b> {project.apiKey}
                    </div>
                    <button
                        className="selectProjectButton"
                        type="button"
                        aria-label="switch"
                        onClick={() => {
                            setExtended(true);
                            setSelectedProject(project);
                        }}
                    >
                        View Data
                    </button>
                </div>
            )}
        </>
    );
}
