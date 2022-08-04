/* eslint-disable no-underscore-dangle */
import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-errors';

import UserDB from '../models/User';
import ProjectDB from '../models/Project';
import QueryDB from '../models/Query';
import sessions from '../utilities/sessions';
import { WrongCredentialsError } from './errors';
import { MongoProject, MongoUser } from '../../@types/resolver';

const resolvers: IResolvers = {
    /*
     * To query nested Project Data in User Object
     */
    User: {
        projects: (parent: User, args, context: Context): Promise<Project[] | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            return ProjectDB.find({ userID: parent.id })
                .then((projects: MongoProject[]): Project[] => projects)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },

        // FIXME: What's the use case for this
        // project: (
        //     parent: User,
        //     args: QueryByID,
        //     context: Context
        // ): Promise<Project | Error> | Error => {
        //     const { authenticated } = context;
        //     if (authenticated === false) return new Error('Unauthorized to make this request');
        //     return ProjectDB.findOne({ _id: args.id, userID: parent.id })
        //         .then((project: any): Project => {
        //             if (!project) throw new Error('Project not found');
        //             return project;
        //         })
        //         .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        // },
    },

    Query: {
        // FIXME: What is the business case for returning a list of users?
        checkAuth: (parent, args, context): Promise<User | Error> | null => {
            if (context.authenticated) {
                return UserDB.findOne({ _id: context.user.id })
                    .then((user: MongoUser): User => {
                        if (!user) throw new Error('User does not exist');
                        return user;
                    })
                    .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
            }
            return null;
        },
        users: (parent, args, context: Context): Promise<User[] | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            return UserDB.find()
                .then((users: MongoUser[]): User[] => users)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        user: (
            parent: undefined,
            args: QueryByID,
            context: Context
        ): Promise<User | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            const { id } = args;

            return UserDB.findOne({ _id: id })
                .then((user: MongoUser): User => {
                    if (!user) throw new Error('User does not exist');
                    return user;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
    },

    Mutation: {
        /*
         *  User Mutations
         */
        login: async (parent: undefined, args: GetUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;
            return UserDB.findOne({ email })
                .then(async (user: MongoUser): Promise<User> => {
                    if (!user) throw new WrongCredentialsError();
                    const verifyPassword: boolean = await bcrypt.compare(password, user.password);
                    if (!verifyPassword) {
                        throw new WrongCredentialsError();
                    }
                    const token = sessions.create({ id: user.id });
                    return {
                        token,
                        email: user.email,
                        password: user.password,
                        id: user.id,
                    };
                })
                .catch((err: Error): Error => {
                    if (err instanceof ApolloError) throw new Error(`${err}`);
                    else throw new Error('Try Again Later');
                });
        },
        signup: async (parent: undefined, args: CreateUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;
            const hash: string = await bcrypt.hash(password, 11);
            return UserDB.findOne({ email })
                .then(async (user: MongoUser): Promise<User> => {
                    if (user) throw new Error('User already exists');
                    const newUser = new UserDB({
                        email,
                        password: hash,
                        projects: [],
                    });
                    const savedUser = await newUser.save();
                    if (!savedUser) throw new Error('Try again later.');
                    const token = sessions.create({ id: savedUser._id.toString() });
                    const idString = savedUser._id.toString();

                    return {
                        token,
                        email: savedUser.email,
                        password: savedUser.password,
                        id: idString,
                    };
                })
                .catch((err: Error): Error => new Error(`${err}`));
        },
        updateUser: async (
            parent: undefined,
            args: UpdateUserArgs,
            context: Context
        ): Promise<User | Error> => {
            const { id, email, password } = args.user;
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            // update object depends on what user passes into the mutation variables
            const updateBody: object = {};

            if (email) Object.assign(updateBody, { email });
            if (password) {
                const hash: string = await bcrypt.hash(password, 11);
                Object.assign(updateBody, { password: hash });
            }

            return UserDB.findByIdAndUpdate(id, updateBody, { new: true })
                .then((user: MongoUser): User => {
                    if (!user) throw new Error('User not found');
                    return user;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        deleteUser: async (
            parent: undefined,
            args: QueryByID,
            context: Context
        ): Promise<User | Error> => {
            const { id } = args;
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');

            // delete each user project query from DB
            await QueryDB.deleteMany({ userID: id }).catch(
                (err: Error) => `DB user project query deletion failed ${err}`
            );

            // delete each user project from DB
            await ProjectDB.deleteMany({ userID: id }).catch(
                (err: Error) => `DB user project deletion failed ${err}`
            );

            // deletes user from DB and returns user object
            return UserDB.findByIdAndRemove(id)
                .then((user: MongoUser): User => user)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
    },
};

export default resolvers;
