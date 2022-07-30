import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import ProjectItem from './ProjectItem';
import { useAuth } from '../auth/AuthProvider';
import Form from './Form';

interface ToolbarProps {
    projects: Project[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectLoading: boolean;
    setAllProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
}

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

export default function ToolBar({
    projects,
    setSelectedProject,
    projectLoading,
    setAllProjects,
}: ToolbarProps) {
    /** State for the component */
    const [extended, setExtended] = useState(true);

    /** GraphQL mutation for creating a project */
    const [createProjectMutation] = useMutation(CREATE_PROJECT, {
        onCompleted: (data: any) => {
            console.log('typeof data', typeof data.createProject);
            let newProjects: Project[];
            if (projects instanceof Array) {
                newProjects = [...projects, data.createProject];
                setAllProjects(newProjects);
            }
            // console.log('newprojects', newProjects);
        },
        onError: (err) => console.log(err),
    });

    useEffect(() => {
        console.log('projects type', typeof projects);
    }, [projects]);

    const { user } = useAuth();

    /** render the toolbar
     * while the GET_PROJECT_DATA query is loading, render the loading component
     * instead of the project list */

    // this is a state for the form
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={`toolBar${extended ? ' closed' : ''}`}>
            {/** //ToDo: make the tool bar look nice. 
                   -toggle in and out from the right hand side. 
                   - sylethe project buttons */}

            <button
                className={`arrow${extended ? ' right' : ' left'}`}
                type="button"
                aria-label="switch"
                onClick={() => setExtended(extended !== true)}
            />
            <div id="toolBarMenu">
                <h3>Projects:</h3>
                {projectLoading ? (
                    <Loading />
                ) : (
                    <>
                        {projects?.map((project: Project) => (
                            <ProjectItem
                                project={project}
                                setSelectedProject={setSelectedProject}
                                setExtended={setExtended}
                            />
                        ))}
                        <button
                            onClick={togglePopup}
                            className="selectProjectButton newProject"
                            type="button"
                        >
                            New Project
                        </button>
                        <div>Menu toSee/update profile info</div>
                        {isOpen && (
                            <Form
                                togglePopup={togglePopup}
                                createProjectMutation={createProjectMutation}
                                userID={user!.id}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
