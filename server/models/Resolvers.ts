import User from './User';

const bcrypt = require('bcryptjs');

// type QueryUserArgs = {
//     email: string;
// };
type QueryUserArgs = {
    _id: string;
};

type CreateUserArgs = {
    input: { email: string; password: string };
};

// type EmailArg = {
//     email: string;
// };
type IdArg = {
    _id: string;
};

type UpdateUser = {
    _id: String;
    email: String;
    password: string;
};

type User = {
    _id: String;
    email: String;
    password: String;
};

type Users = {
    _id: String;
    email: String;
    password: String;
}[];

type DeleteUserPayload = {
    deleted: Boolean;
    user: User;
};

const resolvers = {
    Query: {
        users: async (parent: undefined, args: QueryUserArgs) => {
            return User.find()
                .then((users: Users) => {
                    return users;
                })
                .catch(() => new Error('DB query failed'));
        },
        user: async (parent: undefined, args: IdArg) => {
            //the issue here is that we talked and decided to change from email args to ID args to show user. For some reason it is not working (still expecting email)
            const { _id } = args;

            return User.findOne({ _id })
                .then((user: User) => {
                    if (!user) return new Error('User does not exist');
                    return {
                        _id: user._id,
                        email: user.email,
                        password: user.password,
                    };
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
        updateUser: async (parent: undefined, args: UpdateUser) => {
            //this one is asking for INPUT ARGUMENT ???!?!!
            const { _id } = args;
            const pass = await bcrypt.hash(args.password, 12);
            const update = User.findByIdAndUpdate(
                _id,
                { email: args.email, password: pass },
                { new: true }
            )
                .then((user: User) => {
                    return user;
                })
                .catch(() => new Error('DB query failed'));

            return update;
        },
        deleteUser: async (parent: undefined, args: IdArg) => {
            //the same with user query - the issue here is that we talked and decided to change from email args to ID args to show user. For some reason it is not working (still expecting emaik)
            const { _id } = args;
            User.findByIdAndRemove({ _id })
                .then((user: User) => {
                    return User.find() //the idea here is to return all the users database. Not sure if it's working
                        .then((users: Users) => {
                            return users;
                        });
                })
                .catch(() => new Error('DB query failed'));
        },
    },
};

export default resolvers;
