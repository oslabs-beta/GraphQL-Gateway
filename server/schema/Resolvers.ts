import UserDB from '../models/User';
import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';

import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';

const resolvers: IResolvers = {
    Query: {
        /*
         * User queries
         */
        users: () =>
            UserDB.find()
                .then((users: User[]): User[] => users)
                .catch(() => new Error('DB query failed')),
        user: (args: QueryByID) => {
            const { id } = args;

            return UserDB.findOne({ _id: id })
                .then((user: User): User | Error => {
                    if (!user) return new Error('User does not exist');
                    return user;
                })
                .catch(() => new Error('DB query failed'));
        },
        projects: () =>
            ProjectDB.find()
                .then((projects: Project[]): Project[] => projects)
                .catch(() => new Error('DB query failed.')),
        project: (args: QueryByID) => {
            const { id } = args;

            return ProjectDB.findOne({ _id: id })
                .then((project: Project): Project | Error => {
                    if (!project) throw new Error('Project does not exist');
                    return project;
                })
                .catch(() => new Error('DB query failed'));
        },
    },
    Mutation: {
        /*
         *  User Mutations
         */
        createUser: async (parent: undefined, args: CreateUserArgs) => {
            const { email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);

            return UserDB.findOne({ email })
                .then((user: User) => {
                    if (user) throw new Error('User already exists');
                    const newUser = new UserDB({
                        email,
                        password: hash,
                        projects: [],
                    });
                    return newUser.save();
                })
                .then((newUser: User) => newUser)
                .catch(() => new Error('DB query failed'));
        },
        updateUser: async (parent: undefined, args: UpdateUserArgs) => {
            const { id, email, password } = args.user;
            const hash = await bcrypt.hash(password, 11);
            return UserDB.findByIdAndUpdate(id, { email, password: hash }, { new: true })
                .then((user: User) => {
                    if (!user) return new Error('User not found');
                    return user;
                })
                .catch(() => new Error('DB query failed'));
        },
        deleteUser: async (args: QueryByID) => {
            const { id } = args;
            return UserDB.findByIdAndRemove({ id })
                .then((user: User) => user)
                .catch(() => new Error('DB query failed'));
        },
        /*
         *  Project Mutations
         */
        createProject: async (parent: undefined, args: CreateProjectArgs) => {
            const { userID, name } = args.project;

            return ProjectDB.findOne({ userID, name })
                .then((project: Project) => {
                    if (project) return new Error('Project already exists');
                    const newProject = new ProjectDB({
                        userID,
                        name,
                        queries: [],
                    });
                    return newProject.save();
                })
                .then((newProject: Project) => newProject)
                .catch(() => new Error('DB query failed'));
        },
        /*
         *  to avoid multiple E2E requests from the client, first DB query
         *   will be to recieve the existing project queries, and second DB query
         *   will be to update the specified project with a concatted queries array
         */
        updateProject: async (parent: undefined, args: UpdateProjectArgs) => {
            const { id, name, queries } = args.project;
            let comboQueries = await ProjectDB.findById(id).then((project) => project.queries);

            if (queries.length > 0) comboQueries = comboQueries.concat(queries);

            return ProjectDB.findByIdAndUpdate(id, { name, comboQueries }, { new: true })
                .then((project: Project) => {
                    if (!project) return new Error('Project not found');
                    return project;
                })
                .catch(() => new Error('DB query failed'));
        },
        deleteProject: async (parent: undefined, args: QueryByID) => {
            const { id } = args;
            return ProjectDB.findByIdAndRemove(id)
                .then((project: Project) => project)
                .catch(() => new Error('DB query failed'));
        },
        /*
         * Project Query Mutations
         */
        createProjectQuery: async (parent: undefined, args: CreateProjectQueryArgs) => {
            const { projectID, name, depth, complexity, time } = args.projectQuery;
            const newQuery = new QueryDB({
                projectID,
                name,
                depth,
                complexity,
                time,
            });

            return newQuery
                .save()
                .then((res: ProjectQuery) => res)
                .catch((err: Error) => new Error(`Error: Save to DB failed -> ${err}`));
        },
        updateProjectQuery: async (parent: undefined, args: UpdateProjectQueryArgs) => {
            const { id, name, depth, complexity, time } = args.query;
            return QueryDB.findByIdAndUpdate(id, { name, depth, complexity, time }, { new: true })
                .then((query: ProjectQuery) => {
                    if (!query) throw new Error('Query not found');
                    return query;
                })
                .catch(() => new Error('DB query failed'));
        },
        deleteProjectQuery: async (parent: undefined, args: QueryByID) => {
            const { id } = args;
            return QueryDB.findByIdAndRemove(id)
                .then((query: ProjectQuery) => query)
                .catch(() => new Error('DB query failed'));
        },
    },
    /*
     * To query nested Project Data in User Object
     */
    User: {
        projects: (parent: User) => {
            return ProjectDB.find({ userID: parent.id })
                .then((projects: Project[]) => projects)
                .catch(() => new Error('DB query failed'));
        },
        project: (parent: User, args: QueryByID) => {
            return ProjectDB.findOne({ _id: args.id, userID: parent.id })
                .then((project: Project) => {
                    if (!project) return Error('Project not found');
                    return project;
                })
                .catch(() => new Error('DB query failed'));
        },
    },
    /*
     * To query nested Query Data in Project Object
     */
    Project: {
        queries: (parent: Project) => {
            return QueryDB.find({ projectID: parent.id })
                .then((queries: ProjectQuery[]) => queries)
                .catch(() => new Error('DB query failed'));
        },
        query: (parent: Project, args: QueryByID) => {
            return QueryDB.findOne({ _id: args.id, userID: parent.id })
                .then((query: ProjectQuery) => {
                    if (!query) return Error('Query not found');
                    return query;
                })
                .catch(() => new Error('DB query failed'));
        },
    },
};

export default resolvers;
