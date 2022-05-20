import User from './User';

const bcrypt = require('bcryptjs');

type QueryUserArgs = {
    email: string;
};

type CreateUserArgs = {
    input: { email: string; password: string };
};

type EmailArg = {
    email: string;
};

type User = {
    email: String;
};

const resolvers = {
    Query: {
        users: () =>
            // placeholder
            [
                { id: '1', email: '1' },
                { id: '2', email: '2' },
            ],
        user: async (parent: undefined, args: QueryUserArgs) => {
            const { email } = args;

            return User.findOne({ email })
                .then((user: User) => {
                    if (!user) return new Error('User does not exist');
                    return { email: user.email };
                })
                .catch(() => new Error('DB query failed'));
        },
    },
    Mutation: {
        createUser: async (parent: undefined, args: CreateUserArgs) => {
            const { email, password } = args.input;
            const hash = await bcrypt.hash(password, 10);

            return User.findOne({ email })
                .then((user: User) => {
                    if (user) return new Error('User already exists in DB');
                    const newUser = new User({
                        email,
                        password: hash,
                    });
                    return newUser.save();
                })
                .then((newUser: User) => newUser)
                .catch(() => new Error('DB query failed'));
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
