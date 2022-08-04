interface AuthUser {
    id: string;
    email: string;
    password: string;
    token: string;
}

interface User extends AuthUser {
    projects: Array<Project>;
}
// interface User {
//     id: string;
//     email: string;
//     password: string;
//     projects: [Project];
//     project: Project; // FIXME: iS this ever used?
// }

interface GetUserArgs {
    user: {
        email: string;
        password: string;
    };
}

interface CreateUserArgs {
    user: { email: string; password: string; projects: Array<string> };
}

interface UpdateUserArgs {
    user: {
        id: number;
        email: string;
        password: string;
    };
}

interface Context {
    authenticated: boolean;
    user: null | string | JwtPayload;
}
