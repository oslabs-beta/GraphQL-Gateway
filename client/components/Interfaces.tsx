export interface ProjectQuery {
    id: string;
    name: string;
    projectID: string;
    depth: number;
    complexity: number;
    time: number;
}

export interface Project {
    id: string;
    userID: string;
    name: string;
    queries: [ProjectQuery];
    query: ProjectQuery;
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
