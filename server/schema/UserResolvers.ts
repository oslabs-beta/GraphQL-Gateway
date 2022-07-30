/* eslint-disable no-underscore-dangle */
import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';

import UserDB from '../models/User';
import ProjectDB from '../models/Project';
import QueryDB from '../models/Query';
import sessions from '../utilities/sessions';

const resolvers: IResolvers = {
    /*
     * To query nested Project Data in User Object
     */
    User: {
        projects: (parent: User): Promise<Project[] | Error> =>
            ProjectDB.find({ userID: parent.id })
                .then((projects: Project[]): Project[] => projects)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),

        project: (parent: User, args: QueryByID): Promise<Project | Error> =>
            ProjectDB.findOne({ _id: args.id, userID: parent.id })
                .then((project: Project): Project => {
                    if (!project) throw new Error('Project not found');
                    return project;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),
    },

    Query: {
        users: (): Promise<User[] | Error> =>
            UserDB.find()
                .then((users: User[]): User[] => users)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),

        user: (parent: undefined, args: QueryByID): Promise<User | Error> => {
            const { id } = args;

            return UserDB.findOne({ _id: id })
                .then((user: User): User => {
                    if (!user) throw new Error('User does not exist');
                    return user;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },

        // Auth Queries
        checkAuth: (parent, args, context): Promise<User | Error> | null => {
            if (context.authenticated) {
                return UserDB.findOne({ _id: context.user.id })
                    .then((user: User): User => {
                        if (!user) throw new Error('User does not exist');
                        return user;
                    })
                    .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
            }
            return null;
        },
    },

    Mutation: {
        /*
         *  User Mutations
         */
        login: async (parent: undefined, args: GetUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;

            return UserDB.findOne({ email })
                .then(async (user: any): Promise<User> => {
                    if (!user.email) {
                        throw new Error('Email not found.');
                    }
                    const verifyPassword: boolean = await bcrypt.compare(password, user.password);
                    if (!verifyPassword) {
                        throw new Error('Password you entered is incorrect.');
                    }

                    const token = sessions.create({ id: user._id });
                    return {
                        token,
                        email: user.email,
                        password: user.password,
                        id: user._id,
                        projects: [],
                    };
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        signup: async (parent: undefined, args: CreateUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;
            const hash: string = await bcrypt.hash(password, 11);
            return UserDB.findOne({ email })
                .then(async (user: User): Promise<User> => {
                    if (user) throw new Error('User already exists');
                    const newUser = new UserDB({
                        email,
                        password: hash,
                        projects: [],
                    });
                    const savedUser = await newUser.save();
                    if (!savedUser) throw new Error('Could not save user. Try again later.');
                    const token = sessions.create({ id: savedUser._id });
                    return {
                        token,
                        email: savedUser.email,
                        password: savedUser.password,
                        id: savedUser._id,
                        projects: [],
                    };
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        updateUser: async (parent: undefined, args: UpdateUserArgs): Promise<User | Error> => {
            const { id, email, password } = args.user;

            // update object depends on what user passes into the mutation variables
            const updateBody: object = {};

            if (email) Object.assign(updateBody, { email });
            if (password) {
                const hash: string = await bcrypt.hash(password, 11);
                Object.assign(updateBody, { password: hash });
            }

            return UserDB.findByIdAndUpdate(id, updateBody, { new: true })
                .then((user: User): User => {
                    if (!user) throw new Error('User not found');
                    return user;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        deleteUser: async (parent: undefined, args: QueryByID): Promise<User | Error> => {
            const { id } = args;

            // delete each user project query from DB
            await QueryDB.deleteMany({ userID: id }).catch(
                (err) => `DB user project query deletion failed ${err}`
            );

            // delete each user project from DB
            await ProjectDB.deleteMany({ userID: id }).catch(
                (err) => `DB user project deletion failed ${err}`
            );

            // deletes user from DB and returns user object
            return UserDB.findByIdAndRemove(id)
                .then((user: User): User => user)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
    },
};

export default resolvers;
