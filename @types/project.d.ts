type Project = {
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    queries: Array<string>;
    rateLimiterConfig: RateLimiterConfig;
};

// interface Project {
//     id: string;
//     userID: string;
//     name: string;
//     apiKey: string;
//     rateLimiterConfig: import('./dashboard').RateLimiterConfig;
//     // queries: [ProjectQuery];
//     // query: ProjectQuery; // FIXME: is this ever used?
// }

type CreateProjectArgs = {
    project: {
        name: string;
        userID: string;
    };
};

type UpdateProjectArgs = {
    // project: {
    id: string;
    name?: string;
    rateLimiterConfig?: RateLimiterUpdateArgs;
    // };
};
