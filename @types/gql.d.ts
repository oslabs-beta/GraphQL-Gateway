type User = {
    id: string;
    email: string;
    password: string;
    projects: Array<string>;
};

type QueryByID = {
    id: string;
};

type CreateUserArgs = {
    user: { email: string; password: string; projects: Array<string> };
};

type UpdateUserArgs = {
    user: {
        id: number;
        email: string;
        password: string;
    };
};

type Project = {
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    queries: Array<string>;
};

type CreateProjectArgs = {
    project: {
        name: string;
        userID: string;
    };
};

type UpdateProjectArgs = {
    project: {
        id: string;
        name: string;
        userID: string;
    };
};

type ProjectQuery = {
    id: string;
    userID: string;
    projectID: string;
    number: string;
    complexity: number;
    depth: number;
    tokens: number;
    success: boolean;
    timestamp: number;
    logged_on: number;
    latency?: number;
};

type CreateProjectQueryArgs = {
    projectQuery: {
        projectID: string;
        number: string;
        complexity: number;
        depth: number;
        tokens: number;
        success: boolean;
        timestamp: number;
        logged_on: number;
        latency?: number;
    };
};
