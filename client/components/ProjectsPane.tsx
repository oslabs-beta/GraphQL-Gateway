import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Loading from './Loading';
import ProjectItem from './ProjectItem';
import Form from './Form';

const CREATE_PROJECT = gql`
    mutation createProjectMutation($project: CreateProjectInput!) {
        createProject(project: $project) {
            name
            id
            userID
            apiKey
        }
    }
`;

export default function ProjectsPane({
    projectLoading,
    projects,
    setSelectedProject,
}: ProjectPaneProps) {
    // this is a state for the form
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        console.log('clicked');
        setIsOpen(!isOpen);
    };

    return (
        <>
            <h3>Projects:</h3>
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
                    <button
                        onClick={togglePopup}
                        className="selectProjectButton newProject"
                        type="button"
                    >
                        New Project
                    </button>
                    {isOpen && (
                        <Form
                            togglePopup={togglePopup}
                            // createProjectMutation={createProjectMutation}
                            // userID={user!.id}
                            createProjectMutation={console.log('hello')}
                            userID={1}
                        />
                    )}
                </>
            )}
        </>
    );
}
