/* eslint-disable no-underscore-dangle */
import { IResolvers } from '@graphql-tools/utils';
import randomString from 'randomstring';
import { Document } from 'mongoose';

import UserDB from '../models/User';
import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';

function isBucketLimiter(rateLimiter: RateLimiterType): rateLimiter is BucketType {
    return ['TOKEN_BUCKET', 'LEAKY_BUCKET'].includes(rateLimiter as BucketType);
}

function isWindowLimiter(rateLimiter: RateLimiterType): rateLimiter is WindowType {
    return ['FIXED_WINDOW', 'SLIDING_WINDOW_LOG', 'SLIDING_WINDOW_COUNTER'].includes(
        rateLimiter as WindowType
    );
}

const resolvers: IResolvers = {
    /*
     * To query nested Query Data in Project Object
     */
    Project: {
        queries: (
            parent: Project,
            args,
            context: Context
        ): Promise<ProjectQuery[] | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            return QueryDB.find({ projectID: parent.id })
                .then((queries: any[]): ProjectQuery[] => queries)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        rateLimiterConfig: (parent: Project): RateLimiterConfig => parent.rateLimiterConfig,
        // query: (
        //     parent: Project,
        //     args: QueryByID,
        //     context: Context
        // ): Promise<ProjectQuery | Error> | Error => {
        //     const { authenticated } = context;
        //     if (authenticated === false) return new Error('Unauthorized to make this request');
        //     return QueryDB.findOne({ _id: args.id, userID: parent.id })
        //         .then((query: any): ProjectQuery => {
        //             if (!query) throw new Error('Query not found');
        //             return query;
        //         })
        //         .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        // },
    },
    Query: {
        projects: (parent, args, context: Context): Promise<Project[] | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            return ProjectDB.find()
                .then((projects: any[]): Project[] => projects)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        project: (
            parent: undefined,
            args: QueryByID,
            context: Context
        ): Promise<Project | Error> | Error => {
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            const { id } = args;

            return ProjectDB.findOne({ _id: id })
                .then((project: any): Project => {
                    if (!project) throw new Error('Project does not exist');
                    return project;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
    },

    Mutation: {
        /*
         *  Project Mutations
         */
        createProject: async (
            parent: undefined,
            args: CreateProjectArgs,
            context: Context
        ): Promise<any> => {
            const { userID, name } = args.project;
            const { authenticated } = context;
            if (authenticated === false) throw new Error('Unauthorized to make this request');

            /* checks if user exists given the userID,
             * throws error otherwise
             */
            await UserDB.findById(userID)
                .then((user: any): void => {
                    if (!user) throw new Error('User does not exist');
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            /*
             * Checks if this project already exists under specified user, if not
             * creates a new project based on the mongoose model and saves it.
             */

            const project = await ProjectDB.findOne({ userID, name });
            if (project) throw new Error('Project already exists');

            // random 10-char string generated and stored in projectDB
            // gate-logger library will cross-reference projects collection
            // to validate API call entered by user with auth key in header "log_key"
            const apiKey = randomString.generate(10);

            // save to DB
            try {
                const newProject = await new ProjectDB({
                    userID,
                    name,
                    apiKey,
                }).save();

                return newProject;
            } catch (err) {
                throw new Error(`Saving project/receiving new ID from DB failed: ${err}`);
            }
        },
        /*
         *   updates project name or rate limiter config
         */
        updateProject: async (
            parent: undefined,
            args: UpdateProjectArgs,
            context: Context
        ): Promise<Project | null> => {
            const { id, name, rateLimiterConfig } = args;
            const { authenticated } = context;
            // TODO: CHECK the difference between throw and return
            if (authenticated === false) throw new Error('Unauthorized to make this request');

            try {
                // FIXME: Use Document to type it
                const project: (Document & Project) | null = await ProjectDB.findById(id);
                if (!project) {
                    throw new Error('[mongoose]: updateProject not found');
                } else {
                    if (name) project.name = name;

                    // FIXME: TYPING
                    if (rateLimiterConfig) {
                        const rateLimiterType = rateLimiterConfig.type;

                        if (
                            (isBucketLimiter(rateLimiterType) &&
                                !Object.prototype.hasOwnProperty.call(
                                    rateLimiterConfig,
                                    'refillRate'
                                )) ||
                            (isWindowLimiter(rateLimiterType) &&
                                !Object.prototype.hasOwnProperty.call(
                                    rateLimiterConfig,
                                    'windowSize'
                                ))
                        ) {
                            project.rateLimiterConfig = rateLimiterConfig;
                        }
                    }

                    await project.save();
                }
                return project;
            } catch (err) {
                throw new Error(`[mongoose]: updateProject error: ${err}`);
            }
            return null;
        },

        deleteProject: async (
            parent: undefined,
            args: QueryByID,
            context: Context
        ): Promise<Project | Error> => {
            const { id } = args;
            const { authenticated } = context;
            if (authenticated === false) return new Error('Unauthorized to make this request');
            await QueryDB.deleteMany({ projectID: id });

            return ProjectDB.findByIdAndRemove(id)
                .then(async (project: any): Promise<Project> => project)
                .catch((err: Error): Error => new Error(`Project deletion failed: ${err}`));
        },
    },
};

export default resolvers;
