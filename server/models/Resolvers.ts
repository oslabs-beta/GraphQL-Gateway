import User from './User';

const bcrypt = require('bcryptjs');

type QueryUserArgs = {
    _id: Number | String | undefined;
};

type CreateUserArgs = {
    user: { email: string; password: string };
};

type UpdateUserArgs = {
    user: {
        _id: Number;
        email: String;
        password: String;
    };
};

type User = {
    _id: Number;
    email: String;
    password: String;
};

const resolvers = {
    Query: {
        users: async (parent: undefined, args: QueryUserArgs) => {
            return User.find()
                .then((users: User) => {
                    return users;
                })
                .catch(() => new Error('DB query failed'));
        },
        user: async (parent: undefined, args: QueryUserArgs) => {
            const { _id } = args;

            return User.findOne({ _id })
                .then((user: User) => {
                    if (!user) return new Error('User does not exist');
                    return {
                        _id,
                        email: user.email,
                        password: user.password,
                    };
                })
                .catch(() => new Error('DB query failed'));
        },
    },
    Mutation: {
        createUser: async (parent: undefined, args: CreateUserArgs) => {
            const { email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);

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
            const { _id, email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);
            return User.findByIdAndUpdate(_id, { email, password: hash }, { new: true })
                .then((user: User) => {
                    if (!user) return new Error('User not found');
                    return user;
                })
                .catch(() => new Error('DB query failed'));
        },
        deleteUser: async (parent: undefined, args: QueryUserArgs) => {
            const { _id } = args;
            return User.findByIdAndRemove({ _id })
                .then((user: User) => {
                    return user;
                })
                .catch(() => new Error('DB query failed'));
        },
    },
};

export default resolvers;
