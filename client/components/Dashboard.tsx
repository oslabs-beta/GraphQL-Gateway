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

interface ProjectResult {
    project: Project;
}
interface ProjectVars {
    projectId: string;
}

interface UpdateRateLimiterVars extends ProjectVars {
    rateLimiterConfig: RateLimiterConfig;
}

export default function Dashboard() {
    /** Bring the user context into this component */
    const { user } = useAuth();

    const [selectedProject, setSelectedProject] = useState<Project>();
    const [rateLimitedQueries, setRateLimitedQueries] = useState<ProjectQuery[]>([]);

    // Apollo graphql hooks
    /** Send query to get project information for this user */
    const [getUserData, userData] = useLazyQuery<{ user: User }, { userId: string }>(
        GET_PROJECT_DATA
    );

    const [getRateLimiterConfig, rateLimitResponse] = useLazyQuery<ProjectResult, ProjectVars>(
        GET_RATE_LIMITER_CONFIG_QUERY,
        { fetchPolicy: 'network-only' }
    );

    const [udpateRateLimiter, { loading: updateLoading }] = useMutation<
        ProjectResult,
        UpdateRateLimiterVars
    >(UPDATE_RATE_LIMITER_CONFIG_MUTATION);

    const fetchRateLimiterConfig = async (projectId: string) => {
        // FIXME: We can conditionally render an error component
        const { error } = await getRateLimiterConfig({
            variables: {
                projectId,
            },
        });
        if (error) {
            console.error(error);
        }
    };

    // User data whenever the user changes
    useEffect(() => {
        if (user?.id) {
            getUserData({
                variables: {
                    userId: user.id,
                },
            });
        }
    }, [user]);

    // RateLimiter Settings whenever the proejct changes
    useEffect(() => {
        // Fetches Rate Limiter settings whenever project is changed
        if (selectedProject?.id) {
            fetchRateLimiterConfig(selectedProject.id).then(() => setRateLimitedQueries([]));
        }
    }, [selectedProject]);

    const handleRateLimiterConfigChange = (
        updatedConfig: RateLimiterConfig,
        saveConfig: boolean
    ) => {
        if (selectedProject) {
            if (saveConfig) {
                // Save config in database
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
            } else {
                // eslint-disable-next-line consistent-return
                (async () => {
                    try {
                        const data: { queries: ProjectQuery[] } = await fetch(
                            `/api/projects/rateLimit/${selectedProject.id}`,
                            {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    authorization: `BEARER: ${localStorage.getItem(
                                        'session-token'
                                    )}`,
                                },
                                body: JSON.stringify({
                                    config: updatedConfig,
                                }),
                            }
                        ).then((res) => res.json());
                        setRateLimitedQueries(data.queries);
                    } catch (err) {
                        return console.error(err);
                    }
                })();
            }
        }
    };

    return (
        <main className="toolBarWrapper">
            <ToolBar
                projects={userData?.data?.user.projects}
                setSelectedProject={setSelectedProject}
                projectLoading={userData ? userData.loading : false}
                rateLimiterConfig={rateLimitResponse?.data?.project.rateLimiterConfig}
                rateLimiterLoading={rateLimitResponse?.loading || updateLoading}
                setRateLimiterConfig={handleRateLimiterConfigChange}
                onRawQueriesClick={() => setRateLimitedQueries([])}
                showSettings={selectedProject != null}
                getUserData={getUserData}
            />
            <ProjectView
                selectedProject={selectedProject}
                projectLoading={userData ? userData.loading : false}
                rateLimiterQueries={rateLimitedQueries}
            />
        </main>
    );
}
