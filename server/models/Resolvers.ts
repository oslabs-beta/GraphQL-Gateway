type QueryUserArgs = {
    email: string;
};

type CreateUserArgs = {
    input: { email: string; password: string };
};

type EmailArg = {
    email: string;
};

const resolvers = {
    Query: {
        users: async () =>
            // placeholder
            [
                { id: '1', email: '1' },
                { id: '2', email: '2' },
            ],
        user: async (parent: undefined, args: QueryUserArgs) => {
            // try-catch db query here
            const { email } = args;
            // placeholder
            return { id: '1', email };
        },
    },
    Mutation: {
        createUser: async (parent: undefined, args: CreateUserArgs) => {
            const { email } = args.input;

            // try-catch db query here

            // placeholder
            return { id: '1', email };
        },
        updateUser: async (parent: undefined, args: EmailArg) => {
            const { email } = args;

            // try-catch db query here

            // placeholder
            return { email };
        },
        deleteUser: async (parent: undefined, args: EmailArg) => {
            const { email } = args;
            // try-catch db query here

            // placeholder
            return { email };
        },
    },
};

export default resolvers;
