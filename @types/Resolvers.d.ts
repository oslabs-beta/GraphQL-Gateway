type User = {
    id: string;
    email: string;
    password: string;
    projects: Array<string>;
};

type QueryByID = {
    id: number | string | undefined;
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
    name: string;
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
        queries: Array<string>;
    };
};

type ProjectQuery = {
    id: string;
    name: string;
    depth: number;
    complexity: number;
};

type CreateProjectQueryArgs = {
    projectQuery: {
        projectID: string;
        name: string;
        depth: number;
        complexity: number;
        time: number;
    };
};

type UpdateProjectQueryArgs = {
    query: {
        id: string;
        name: string;
        depth: number;
        complexity: number;
        time: number;
    };
};
