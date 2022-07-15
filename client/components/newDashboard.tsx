import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-server-express';
import { useQuery } from '@apollo/client';
import ToolBar from './ToolBar';
import ProjectView from './ProjectView';
import { useAuth } from '../auth/AuthProvider';
import { SelectedProject, Projects } from '../../@types/Interfaces';

const GET_PROJECT_DATA = gql`
    query getUserData($userId: String!) {
        user(id: $userId) {
            # note this curretnly gets all projects and queries. This could be a very expersive query.
            projects {
                name
                id
                userID
                apiKey
            }
        }
    }
`;

export default function newDashboard() {
    /** Bring the user context into this component */
    const { user } = useAuth();

    /** State requirments for this component */
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [allProjects, setAllProjects] = useState<Project[]>();

    /** Send query to get project information for this user */
    const { data, loading } = useQuery(GET_PROJECT_DATA, {
        variables: {
            userId: user!.id,
        },
    });
    useEffect(() => {
        if (!loading && data) {
            setAllProjects(data.user.projects);
        }
    }, [loading, data]);

    return (
        <div>
            <ToolBar
                projects={allProjects}
                setSelectedProject={setSelectedProject}
                projectLoading={loading}
            />
            <ProjectView selectedProject={selectedProject} projectLoading={loading} />
        </div>
    );
}
