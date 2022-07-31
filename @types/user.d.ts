type User = {
    id: string;
    email: string;
    password: string;
    projects: Array<Project>;
    token: string;
};
// interface User {
//     id: string;
//     email: string;
//     password: string;
//     projects: [Project];
//     project: Project; // FIXME: iS this ever used?
// }

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
