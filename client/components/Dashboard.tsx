import React, { useState, useEffect } from 'react';
// import { gql } from 'apollo-server-express';
import { useQuery, useLazyQuery, gql, LazyQueryResultTuple, useMutation } from '@apollo/client';
// import { useQuery } from '@apollo/client';
import ToolBar from './ToolBar';
import ProjectView from './ProjectView';
import { useAuth } from '../auth/AuthProvider';

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

const UPDATE_RATE_LIMITER_CONFIG_MUTATION = gql`
    mutation udpateRateLimiter($projectId: String!, $rateLimiterConfig: RateLimiterConfigInput) {
        updateProject(id: $projectId, rateLimiterConfig: $rateLimiterConfig) {
            rateLimiterConfig {
                type
                options {
                    ... on WindowOptions {
                        capacity
                        windowSize
                    }
                    ... on BucketOptions {
                        capacity
                        refillRate
                    }
                }
            }
        }
    }
`;

const GET_RATE_LIMITER_CONFIG_QUERY = gql`
    query getRateLimiter($projectId: String!) {
        project(id: $projectId) {
            rateLimiterConfig {
                type
                options {
                    ... on WindowOptions {
                        capacity
                        windowSize
                    }
                    ... on BucketOptions {
                        capacity
                        refillRate
                    }
                }
            }
        }
    }
`;

interface RateLimiterVars {
    projectId: string;
}

// TODO: Start with blank for clarity
const DEFAULT_RATE_LIMITER_OPTIONS: RateLimiterConfig = {
    type: 'TOKEN_BUCKET',
    options: {
        capacity: 10,
        refillRate: 1,
    },
};

export default function Dashboard() {
    /** Bring the user context into this component */
    const { user } = useAuth();

    /** State requirments for this component */
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [allProjects, setAllProjects] = useState<Project[]>();
    const [rateLimiterConfig, setRateLimiterConfig] = useState<RateLimiterConfig>(
        DEFAULT_RATE_LIMITER_OPTIONS
    );
    const [rateLimiterLoading, setRateLimiterLoading] = useState<boolean>(false);

    // Apollo graphql hooks
    // FIXME: Need to refetch data since useQuery will cache
    const [getRateLimiterConfig, rateLimitResponse] = useLazyQuery<
        { project: Project },
        RateLimiterVars
    >(GET_RATE_LIMITER_CONFIG_QUERY, {
        variables: {
            projectId: selectedProject?.id || '1',
        },
    });

    const [udpateRateLimiter, udpateRateLimiterResponse] = useMutation(
        UPDATE_RATE_LIMITER_CONFIG_MUTATION
    );

    useEffect(() => {
        // FIXME: check component is still mounted
        const fetchData = async () => {
            const { data, error } = await getRateLimiterConfig();
            if (error) {
                console.error(error);
            } else if (data) {
                setRateLimiterConfig(data.project.rateLimiterConfig);
            }
        };

        if (selectedProject?.id) {
            fetchData(); // FIXME: Use IIFE
        }
    }, [selectedProject]);

    useEffect(() => {
        setRateLimiterLoading(false);
    }, [rateLimitResponse]);

    const handleRateLimiterConfigChange = (
        updatedConfig: RateLimiterConfig,
        saveConfig: boolean
    ) => {
        if (saveConfig) {
            // Save config in database
            if (selectedProject) {
                // TODO: save config to state
                udpateRateLimiter({
                    variables: {
                        projectId: selectedProject.id,
                        rateLimiterConfig: updatedConfig,
                    },
                });
            }
        } else {
            console.error('Query preview not available');
            // TODO: Recalcualte data for current projects.
            // import rate limiter
            // connect to mock redis store
            // configure the selected rate limiter
            // feed all of the data into the rate limiter
            // update quey data in the view
        }
        setRateLimiterConfig(updatedConfig);
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
                rateLimiterLoading={rateLimiterLoading}
                setRateLimiterConfig={handleRateLimiterConfigChange}
            />
            <ProjectView selectedProject={selectedProject} projectLoading={loading} />
        </div>
    );
}
