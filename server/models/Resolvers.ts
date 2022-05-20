export const resolvers = {
    Query: {
        users: async (parent: any, args: any, context: any) =>
            // placeholder
            [
                { id: '1', email: '1' },
                { id: '2', email: '2', parent, args, context },
            ],
        user: async (parent: any, args: any, context: any) =>
            // try-catch db query here

            // placeholder
            ({ id: '1', email: '1', parent, args, context }),
    },
    Mutation: {
        createUser: async (parent: any, args: any, context: any) => {
            const { email } = args.input;

            // try-catch db query here

            // placeholder
            return { id: '1', email, parent, context };
        },
        updateUser: async (parent: any, args: any, context: any) => {
            const { id, email } = args.input;

            // try-catch db query here

            // placeholder
            return { id, email, parent, context };
        },
        deleteUser: async (parent: any, args: any, context: any) => {
            const { id } = args;

            // try-catch db query here

            // placeholder
            return { id, email: '1', parent, context };
        },
    },
};

export default resolvers;
