import React, { useState } from 'react';

interface ProjectItemProps {
    project: Project;
    setSelectedProject: any;
}

export default function ProjectItem({ project, setSelectedProject }: ProjectItemProps) {
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
                    <div>
                        <b>API Key:</b> {project.apiKey}
                    </div>
                    <button
                        className="selectProjectButton"
                        type="button"
                        aria-label="switch"
                        onClick={() => {
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
