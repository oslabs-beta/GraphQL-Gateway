import React, { useState, useEffect } from 'react';
// import { gql } from 'apollo-server-express';
import { useQuery, gql } from '@apollo/client';
// import { useQuery } from '@apollo/client';
import ToolBar from './ToolBar';
import ProjectView from './ProjectView';
import { useAuth } from '../auth/AuthProvider';
import { RateLimiterConfig } from '../../@types/dashboard';
// import { SelectedProject, Projects } from '../../@types/Interfaces';

const GET_PROJECT_DATA = gql`
    query getUserData($userId: String!) {
        user(id: $userId) {
            projects {
                name
                id
                userID
                apiKey
            }
        }
    }
`;

export default function Dashboard() {
    /** Bring the user context into this component */
    const { user } = useAuth();

    /** State requirments for this component */
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [allProjects, setAllProjects] = useState<Project[]>();
    const [rateLimiterConfig, setRateLimiterConfig] = useState<RateLimiterConfig>();

    useEffect(() => {
        // FIXME: Fetch from the database.
        setRateLimiterConfig({
            type: 'TOKEN_BUCKET',
            options: {
                refillRate: 1,
                capacity: 10,
            },
        });
    }, []);

    const handleRateLimiterConfigChange = (updatedConfig: RateLimiterConfig) => {
        setRateLimiterConfig(updatedConfig);
        // TODO: Recalcualte data for current projects.
        // import rate limiter
        // connect to mock redis store
        // configure the selected rate limiter
        // feed all of the data into the rate limiter
        // update quey data in the view
    };

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
                rateLimiterConfig={rateLimiterConfig}
                setRateLimiterConfig={handleRateLimiterConfigChange}
            />
            <ProjectView selectedProject={selectedProject} projectLoading={loading} />
        </div>
    );
}
