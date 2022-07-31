import React from 'react';
import Loading from './Loading';
import ProjectItem from './ProjectItem';

export default function ProjectsPane({
    projectLoading,
    projects,
    setSelectedProject,
}: ProjectPaneProps) {
    return (
        <>
            Projects{' '}
            {projectLoading ? (
                <Loading />
            ) : (
                <>
                    {projects?.map((project) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            setSelectedProject={setSelectedProject}
                        />
                    ))}
                    <button type="button">Create a new Project</button>
                    <div>Menu toSee/update profile info</div>
                </>
            )}
        </>
    );
}
