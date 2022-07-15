/* eslint-disable no-underscore-dangle */
import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';
import randomString from 'randomstring';

import UserDB from '../models/User';
import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';
import sessions from '../utilities/sessions';

const resolvers: IResolvers = {
    Query: {
        /*
         * User queries
         */
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
        projectQueries: (parent: undefined, args: QueryByID): Promise<ProjectQuery[] | Error> => {
            const { id } = args;
            return QueryDB.find({ projectID: id })
                .then((queries: ProjectQuery[]): ProjectQuery[] => queries)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        projectQuery: (parent: undefined, args: QueryByID): Promise<ProjectQuery | Error> => {
            const { id } = args;

            return QueryDB.findOne({ _id: id })
                .then((query: ProjectQuery): ProjectQuery => {
                    if (!query) throw new Error('Query does not exist');
                    return query;
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
         *   updates project name
         */
        updateProject: async (
            parent: undefined,
            args: UpdateProjectArgs
        ): Promise<Project | Error> => {
            const { id, name } = args.project;

            if (name)
                return ProjectDB.findByIdAndUpdate(id, { name }, { new: true })
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
        /*
         * Project Query Mutations
         * this mutation also adds the resulting project query DB id to its related project
         */
        createProjectQuery: async (
            parent: undefined,
            args: CreateProjectQueryArgs
        ): Promise<ProjectQuery | Error> => {
            const { projectID } = args.projectQuery;
            const newQueryProps = args.projectQuery;

            // only add latency to the query object if it was passed into variables
            if (args.projectQuery.latency) newQueryProps.latency = args.projectQuery.latency;

            /* checks if project exists given the projectID and
             * throws error if not
             */
            const userID: string | undefined | Error = await ProjectDB.findById(projectID)
                .then((project: Project): string | undefined => {
                    if (!project) throw new Error('Project does not exist');
                    return project?.userID;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            const queries: string | ProjectQuery[] = await QueryDB.find({ projectID }).catch(
                (err) => `DB query failed: ${err}`
            );
            const newNumber: number = queries.length + 1;

            const newQuery = new QueryDB({
                ...newQueryProps,
                userID,
                number: newNumber,
            })
                .save()
                .then((res: ProjectQuery): ProjectQuery => res)
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            return newQuery;
        },
        deleteProjectQuery: async (
            parent: undefined,
            args: QueryByID
        ): Promise<ProjectQuery | Error> => {
            const { id } = args;
            return QueryDB.findByIdAndRemove(id)
                .then(async (query: ProjectQuery): Promise<ProjectQuery | Error> => query)
                .catch((err: Error): Error => new Error(`Query deletion failed: ${err}`));
        },
    },
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
};

export default resolvers;
