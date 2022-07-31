import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
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

    /** State requirements for this component */
    const [selectedProject, setSelectedProject] = useState<Project>();

    // Apollo graphql hooks
    /** Send query to get project information for this user */
    const [getUserData, userData] = useLazyQuery<{ user: User }, { userId: string }>(
        GET_PROJECT_DATA
    );

    useEffect(() => {
        if (user?.id) {
            getUserData({
                variables: {
                    userId: user.id,
                },
            });
        }
    }, [user]);

    const [getRateLimiterConfig, rateLimitResponse] = useLazyQuery<
        { project: Project },
        RateLimiterVars
    >(GET_RATE_LIMITER_CONFIG_QUERY, { fetchPolicy: 'network-only' });

    const [udpateRateLimiter] = useMutation(UPDATE_RATE_LIMITER_CONFIG_MUTATION);

    useEffect(() => {
        // Fetches Rate Limiter settings whenever project is changed
        if (selectedProject?.id) {
            (async () => {
                // FIXME: We can conditionally render an error component and remove the IIFE
                const { error } = await getRateLimiterConfig({
                    variables: {
                        projectId: selectedProject.id,
                    },
                });
                if (error) {
                    console.error(error);
                }
            })();
        }
    }, [selectedProject]);

    const handleRateLimiterConfigChange = (
        updatedConfig: RateLimiterConfig,
        saveConfig: boolean
    ) => {
        if (saveConfig) {
            // Save config in database
            if (selectedProject) {
                udpateRateLimiter({
                    variables: {
                        projectId: selectedProject.id,
                        rateLimiterConfig: updatedConfig,
                    },
                    // Refetch rate limiter data. The rate limiter query bypasses the cache so we can't just update the cache here.
                    refetchQueries: [
                        {
                            query: GET_RATE_LIMITER_CONFIG_QUERY,
                            variables: { projectId: selectedProject.id },
                        },
                    ],
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
        // setRateLimiterConfig(updatedConfig);
    };

    return (
        <div>
            <ToolBar
                projects={userData?.data?.user.projects}
                setSelectedProject={setSelectedProject}
                projectLoading={userData ? userData.loading : false}
                rateLimiterConfig={
                    rateLimitResponse && rateLimitResponse.data
                        ? rateLimitResponse.data.project.rateLimiterConfig
                        : DEFAULT_RATE_LIMITER_OPTIONS
                }
                rateLimiterLoading={rateLimitResponse ? rateLimitResponse.loading : false}
                setRateLimiterConfig={handleRateLimiterConfigChange}
            />
            <ProjectView
                selectedProject={selectedProject}
                projectLoading={userData ? userData.loading : false}
            />
        </div>
    );
}
