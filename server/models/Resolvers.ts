export const resolvers = {
    Query: {
        users: async (parent: any, args: any, context: any) =>
            // try-catch db query here

            // placeholder
            [
                { id: '1', email: '1' },
                { id: '2', email: '2' },
            ],
        user: async (parent: any, args: any, context: any) =>
            // try-catch db query here

            // placeholder
            ({ id: '1', email: '1' }),
    },
    Mutation: {
        createUser: async (parent: any, args: any, context: any) => {
            const { email } = args.input;

            // try-catch db query here

            // placeholder
            return { id: '1', email };
        },
        updateUser: async (parent: any, args: any, context: any) => {
            const { id, email } = args.input;

            // try-catch db query here

            // placeholder
            return { id, email: '1' };
        },
        deleteUser: async (parent: any, args: any, context: any) => {
            const { id } = args;

            // try-catch db query here

            // placeholder
            return { id, email: '1' };
        },
    },
};

export default resolvers;
