import UserDB from '../models/User';

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
    _id: String;
    email: String;
    password: String;
};

const resolvers = {
    Query: {
        users: async () =>
            UserDB.find()
                .then((users: User[]): User[] => users)
                .catch(() => new Error('DB query failed')),
    },
    user: async (args: QueryUserArgs) => {
        const { _id } = args;

        return UserDB.findOne({ _id })
            .then((user: User): User | Error => {
                if (!user) return new Error('User does not exist');
                return {
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                };
            })
            .catch(() => new Error('DB query failed'));
    },
    Mutation: {
        createUser: async (args: CreateUserArgs) => {
            const { email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);

            return UserDB.findOne({ email })
                .then((user: User) => {
                    if (user) return new Error('User already exists in DB');
                    const newUser = new UserDB({
                        email,
                        password: hash,
                    });
                    return newUser.save();
                })
                .then((newUser: User) => newUser)
                .catch(() => new Error('DB query failed'));
        },
        updateUser: async (args: UpdateUserArgs) => {
            const { _id, email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);
            return UserDB.findByIdAndUpdate(_id, { email, password: hash }, { new: true })
                .then((user: User) => {
                    if (!user) return new Error('User not found');
                    return user;
                })
                .catch(() => new Error('DB query failed'));
        },
        deleteUser: async (args: QueryUserArgs) => {
            const { _id } = args;
            return UserDB.findByIdAndRemove({ _id })
                .then((user: User) => user)
                .catch(() => new Error('DB query failed'));
        },
    },
};

export default resolvers;
