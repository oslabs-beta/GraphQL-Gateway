import User from './User';

const bcrypt = require('bcryptjs');

type QueryUserArgs = {
    id: Number | String | undefined;
};

type CreateUserArgs = {
    input: { email: string; password: string };
};

type UpdateUserArgs = {
    input: {
        id: Number;
        email: String;
        password: String;
    };
};

type User = {
    id: Number;
    email: String;
    password: String;
};

const resolvers = {
    Query: {
        user: async (parent: undefined, args: QueryUserArgs) => {
            const { id } = args;

            return User.findOne({ id })
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
        updateUser: async (parent: undefined, args: UpdateUserArgs) => {
            const { id } = args.input;

            // try-catch db query here

            // placeholder
            return { id };
        },
        deleteUser: async (parent: undefined, args: QueryUserArgs) => {
            const { id } = args;
            // try-catch db query here

            // placeholder
            return { id };
        },
    },
};

export default resolvers;
