/* eslint-disable no-underscore-dangle */
import { IResolvers } from '@graphql-tools/utils';
import randomString from 'randomstring';

import UserDB from '../models/User';
import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';

const resolvers: IResolvers = {
    /*
     * To query nested Query Data in Project Object
     */
    Project: {
        queries: (parent: Project): Promise<ProjectQuery[] | Error> =>
            QueryDB.find({ projectID: parent.id })
                .then((queries: ProjectQuery[]): ProjectQuery[] => queries)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),
        query: (parent: Project, args: QueryByID): Promise<ProjectQuery | Error> =>
            QueryDB.findOne({ _id: args.id, userID: parent.id })
                .then((query: ProjectQuery): ProjectQuery => {
                    if (!query) throw new Error('Query not found');
                    return query;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`)),
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
        ): Promise<Project | Error> => {
            const { id, name, rateLimiterConfig } = args.project;

            if (name)
                return ProjectDB.findByIdAndUpdate(id, { name, rateLimiterConfig }, { new: true })
                    .then((project: Project): Project => {
                        if (!project) throw new Error('Project not found');
                        return project;
                    })
                    .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
            throw new Error('Updated name not provided');
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
