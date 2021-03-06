export interface ProjectQuery {
    id: string;
    number: number;
    projectID: string;
    depth: number;
    complexity: number;
    timestamp: number;
    tokens: number;
    // latency: number;
    success: boolean;
}

export interface Project {
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    // queries: [ProjectQuery];
    // query: ProjectQuery;
}
export interface User {
    id: string;
    email: string;
    password: string;
    projects: [Project];
    project: Project;
}

export interface Data {
    user: User;
}

export interface Projects {
    projects: [Project] | undefined;
}
export interface SelectedProject {
    project: Project | undefined;
}
