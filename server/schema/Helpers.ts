import QueryDB from '../models/Query';
import ProjectDB from '../models/Project';
import UserDB from '../models/User';

// enter project query ID and deletes it from DB and associate project's queries array
export function deleteQuery(id: string): Promise<ProjectQuery | Error> {
    // also deletes projectID from userDB's project array
    return QueryDB.findByIdAndRemove(id)
        .then(async (query: ProjectQuery): Promise<ProjectQuery | Error> => {
            // store project's query array to remove query to be deleted
            const queryArr = await ProjectDB.findById(query.projectID).then(
                (project: Project): Array<string> => project.queries
            );

            // removes projectID from user's project array
            queryArr.splice(queryArr.indexOf(id), 1);

            await ProjectDB.findByIdAndUpdate(query.projectID, { queries: queryArr }).catch(
                (err: Error): Error => new Error(`DB update failed: ${err}`)
            );
            return query;
        })
        .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
}

// enter project ID as parameter and deletes the project, all queries
// associated, and the ID from associated user's project array
export async function deleteProject(id: string): Promise<Project | Error> {
    // first, goes through project's queries array and deletes each from DB
    await ProjectDB.findById(id).then((project): void => {
        for (let i = project.queries.length - 1; i >= 0; i -= 1) {
            deleteQuery(project.queries[i]);
        }
    });

    // also deletes projectID from userDB's project array
    return ProjectDB.findByIdAndRemove(id)
        .then(async (project: Project): Promise<Project> => {
            const projectArr = await UserDB.findById(project.userID).then(
                (user): Array<string> => user.projects
            );

            // removes projectID from user's project array
            projectArr.splice(projectArr.indexOf(id), 1);

            await UserDB.findByIdAndUpdate(project.userID, { projects: projectArr }).catch(
                (err: Error): Error => new Error(`DB update failed: ${err}`)
            );

            return project;
        })
        .catch((err: Error): Error => new Error(`DB query failed: ${err}`));
}
