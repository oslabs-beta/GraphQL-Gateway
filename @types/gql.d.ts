type User = {
    // _id?: string;
    id: string;
    email: string;
    password: string;
    projects: Array<string>;
    token: string;
};

type QueryByID = {
    id: string;
    date: any;
    offset: any;
};

type GetUserArgs = {
    user: {
        email: string;
        password: string;
    };
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
    number: number;
    depth: number;
    complexity: number;
    tokens: number;
    success: boolean;
    timestamp: number;
    loggedOn: number;
    latency?: number;
};

type Context = {
    authenticated: boolean;
    user: null | string | JwtPayload;
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
        loggedOn: number;
        latency?: number;
    };
};
