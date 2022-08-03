import { IResolvers } from '@graphql-tools/utils';

import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';

const resolvers: IResolvers = {
    Query: {
        // TODO: Add option to apply rate limiter analysis
        projectQueries: (parent: undefined, args: QueryByID): Promise<ProjectQuery[] | Error> => {
            const { id, minDate, maxDate } = args;
            return QueryDB.find({ projectID: id, timestamp: { $gte: minDate, $lt: maxDate } })
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
};

export default resolvers;
