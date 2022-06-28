import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';
import UserDB from '../models/User';
import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';

const resolvers: IResolvers = {
    Query: {
        /*
         * User queries
         */
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
    },
    Mutation: {
        /*
         *  User Mutations
         */
        findUser: async (parent: undefined, args: GetUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;

            return UserDB.findOne({ email })
                .then(async (user: User): Promise<User> => {
                    if (!user.email) {
                        throw new Error('Email not found.');
                    }
                    const verifyPassword: boolean = await bcrypt.compare(password, user.password);
                    if (!verifyPassword) {
                        throw new Error('Password you entered is incorrect.');
                    }
                    return user;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        createUser: async (parent: undefined, args: CreateUserArgs): Promise<User | Error> => {
            const { email, password } = args.user;
            const hash: string = await bcrypt.hash(password, 11);

            return UserDB.findOne({ email })
                .then((user: User): User => {
                    if (user) throw new Error('User already exists');
                    const newUser = new UserDB({
                        email,
                        password: hash,
                        projects: [],
                    });
                    return newUser.save();
                })
                .then((newUser: User): User => newUser)
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

            /* checks if user exists given the userID, and
             * stores its current project array if it does,
             * throws error otherwise
             */
            let updatedProjects: string[] | Error = await ProjectDB.findById(userID)
                .then((project: Project) => {
                    if (!project) throw new Error('User does not exist');
                    return project.queries;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            /*
             * Checks if this project already exists under specified user, if not
             * creates a new project based on the mongoose model and saves it.
             * result is stored to update project's query array with new project query ID
             */
            return ProjectDB.findOne({ userID, name })
                .then((project: Project): Project => {
                    if (project) throw new Error('Project already exists');

                    // save to DB
                    const newProject = new ProjectDB({
                        userID,
                        name,
                        queries: [],
                    });

                    // store saved project
                    let resultId: string | undefined;
                    const result: Project = newProject
                        .save()
                        .then((res: Project): Project => {
                            // eslint-disable-next-line no-underscore-dangle
                            resultId = res._id;
                            return res;
                        })
                        .catch((err: Error): Error => new Error(`Save to DB failed: ${err}`));

                    // adds new project query to the end of project's query ID array
                    if (Array.isArray(updatedProjects) && typeof resultId === 'string') {
                        updatedProjects = updatedProjects.concat([resultId]);
                    }
                    // updates associated project's query array in DB to include new project query
                    UserDB.findByIdAndUpdate(userID, { projects: updatedProjects }, { new: true })
                        .then((user: User): void => {
                            if (!user) throw new Error('User not found');
                        })
                        .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

                    return result;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        /*
         *   updates project's queries array with new queries array concatted to end
         */
        updateProject: async (
            parent: undefined,
            args: UpdateProjectArgs
        ): Promise<Project | Error> => {
            const { id, name } = args.project;
            const updateBody: object = {};

            if (name) Object.assign(updateBody, { name });

            return ProjectDB.findByIdAndUpdate(id, updateBody, { new: true })
                .then((project: Project): Project => {
                    if (!project) throw new Error('Project not found');
                    return project;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        deleteProject: async (parent: undefined, args: QueryByID): Promise<Project | Error> => {
            const { id } = args;

            // also deletes projectID from userDB's project array
            return ProjectDB.findByIdAndRemove(id)
                .then(async (project: Project): Promise<Project> => {
                    const projectArr = await UserDB.findById(project.userID).then(
                        (user): Array<string> => user.projects
                    );

                    // removes projectID from user's project array
                    projectArr.splice(projectArr.indexOf(id), 1);

                    UserDB.findOneAndUpdate(
                        { _id: project.userID },
                        { projects: projectArr }
                    ).catch((err: Error): Error => new Error(`DB update failed: ${err}`));

                    return project;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        /*
         * Project Query Mutations
         * this mutation also adds the resulting project query DB id to its related project
         */
        createProjectQuery: async (
            parent: undefined,
            args: CreateProjectQueryArgs
        ): Promise<ProjectQuery | Error> => {
            const { projectID, name, depth, complexity, time } = args.projectQuery;

            /* checks if project exists given the projectID, and
             * stores its current queryID array if it does,
             * throws error otherwise
             */
            let updatedQueries: string[] | Error = await ProjectDB.findById(projectID)
                .then((project: Project): string[] => {
                    if (!project) throw new Error('Project does not exist');
                    return project.queries;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

            /*
             * Checks if this query already exists under specified project, if not
             * creates a new project query based on the mongoose model and saves it.
             * result is stored to update project's query array with new project query ID
             */
            return QueryDB.findOne({ projectID, name }).then((query) => {
                if (query) throw new Error('Query already exists');

                // save to DB
                const newQuery = new QueryDB({
                    projectID,
                    name,
                    depth,
                    complexity,
                    time,
                });

                // store saved query
                let resultId: string | undefined;
                const result: ProjectQuery = newQuery
                    .save()
                    .then((res: ProjectQuery): ProjectQuery => {
                        // eslint-disable-next-line no-underscore-dangle
                        resultId = res._id;
                        return res;
                    })
                    .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

                // adds new project query to the end of project's query ID array
                if (Array.isArray(updatedQueries) && typeof resultId === 'string') {
                    updatedQueries = updatedQueries.concat([resultId]);
                }

                // updates associated project's query array in DB to include new project query
                ProjectDB.findByIdAndUpdate(projectID, { queries: updatedQueries }, { new: true })
                    .then((project: Project): void => {
                        if (!project) throw new Error('Project not found');
                    })
                    .catch((err: Error): Error => new Error(`DB query failed: ${err}`));

                return result;
            });
        },
        updateProjectQuery: async (
            parent: undefined,
            args: UpdateProjectQueryArgs
        ): Promise<ProjectQuery | Error> => {
            const { id, name, depth, complexity, time } = args.projectQuery;
            return QueryDB.findByIdAndUpdate(id, { name, depth, complexity, time }, { new: true })
                .then((query: ProjectQuery): ProjectQuery => {
                    if (!query) throw new Error('Query not found');
                    return query;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
        },
        deleteProjectQuery: async (
            parent: undefined,
            args: QueryByID
        ): Promise<ProjectQuery | Error> => {
            const { id } = args;

            // also deletes projectID from userDB's project array
            return QueryDB.findByIdAndRemove(id)
                .then(async (query: ProjectQuery): Promise<ProjectQuery | Error> => {
                    const queryArr = await ProjectDB.findById(query.projectID).then(
                        (project: Project): Array<string> => project.queries
                    );

                    // removes projectID from user's project array
                    queryArr.splice(queryArr.indexOf(id), 1);

                    ProjectDB.findOneAndUpdate(
                        { _id: query.projectID },
                        { queries: queryArr }
                    ).catch((err: Error): Error => new Error(`DB update failed: ${err}`));

                    return query;
                })
                .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
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
