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
        queries: (parent: Project): Promise<ProjectQuery[] | Error> =>
            QueryDB.find({ projectID: parent.id })
                .then((queries: ProjectQuery[]): ProjectQuery[] => queries)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),

        rateLimiterConfig: (parent: Project): RateLimiterConfig => parent.rateLimiterConfig,
        // query: (parent: Project, args: QueryByID): Promise<ProjectQuery | Error> =>
        //     QueryDB.findOne({ _id: args.id, userID: parent.id })
        //         .then((query: ProjectQuery): ProjectQuery => {
        //             if (!query) throw new Error('Query not found');
        //             return query;
        //         })
        //         .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),
    },
    Query: {
        projects: (): Promise<Project[] | Error> =>
            ProjectDB.find()
                .then((projects: Project[]): Project[] => projects)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),
        project: (parent: undefined, args: QueryByID): Promise<Project | Error> => {
            const { id } = args;

            return ProjectDB.findOne({ _id: id })
                .then((project: Project): Project => {
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
            args: CreateProjectArgs
        ): Promise<Project | Error> => {
            const { userID, name } = args.project;

            /* checks if user exists given the userID,
             * throws error otherwise
             */
            await UserDB.findById(userID)
                .then((user: User): void => {
                    if (!user) throw new Error('User does not exist');
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            /*
             * Checks if this project already exists under specified user, if not
             * creates a new project based on the mongoose model and saves it.
             */
            return ProjectDB.findOne({ userID, name }).then(
                async (project: Project): Promise<Project | Error> => {
                    if (project) throw new Error('Project already exists');

                    // random 10-char string generated and stored in projectDB
                    // gate-logger library will cross-reference projects collection
                    // to validate API call entered by user with auth key in header "log_key"
                    const apiKey = randomString.generate(10);

                    // save to DB
                    const newProject = new ProjectDB({
                        userID,
                        name,
                        apiKey,
                    });

                    // save project
                    return newProject
                        .save()
                        .catch(
                            (err: Error): Error =>
                                new Error(`Saving project/receiving new ID from DB failed: ${err}`)
                        )
                        .finally(() => newProject);
                }
            );
        },
        /*
         *   updates project name or rate limiter config
         */
        updateProject: async (
            parent: undefined,
            args: UpdateProjectArgs
        ): Promise<Project | null> => {
            const { id, name, rateLimiterConfig } = args;

            try {
                const project: (Document & Project) | null = await ProjectDB.findById(id);
                if (!project) {
                    console.log('[mongoose]: updateProject not found');
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
                console.log(`[mongoose]: updateProject error: ${err}`);
            }
            return null;
        },

        deleteProject: async (parent: undefined, args: QueryByID): Promise<Project | Error> => {
            const { id } = args;
            await QueryDB.deleteMany({ projectID: id });

            return ProjectDB.findByIdAndRemove(id)
                .then(async (project: Project): Promise<Project> => project)
                .catch((err: Error): Error => new Error(`Project deletion failed: ${err}`));
        },
    },
};

export default resolvers;
