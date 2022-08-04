import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Loading from './Loading';
import ProjectItem from './ProjectItem';
import Form from './Form';
import { useAuth } from '../auth/AuthProvider';

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
    getUserData,
}: ProjectPaneProps) {
    // this is a state for the form
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const { user } = useAuth();

    const [createProjectMutation] = useMutation(CREATE_PROJECT, {
        onCompleted: (data: any) => {
            getUserData({
                variables: {
                    userId: user?.id,
                },
            });
            window.location.reload();
        },
        onError: (err) => console.log(err),
    });

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
                            createProjectMutation={createProjectMutation}
                            userID={user!.id}
                        />
                    )}
                </>
            )}
        </>
    );
}
