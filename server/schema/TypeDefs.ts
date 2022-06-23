import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        projects: [Project]!
        project: Project
    }

    type Project {
        id: ID!
        userID: String!
        name: String!
        queries: [ProjectQuery]!
        query: ProjectQuery
    }

    type ProjectQuery {
        id: ID!
        name: String!
        projectID: String!
        depth: Int!
        complexity: Int!
        time: Int!
    }

    type Query {
        users: [User!]!
        user(id: String!): User

        projects: [Project]
        project(id: String!): Project

        projectQueries: [ProjectQuery]
        projectQuery: ProjectQuery
    }

    type Mutation {
        createUser(user: CreateUserInput!): User
        updateUser(user: UpdateUserInput!): User
        deleteUser(id: String!): User

        createProject(project: CreateProjectInput!): Project
        updateProject(project: UpdateProjectInput!): Project
        deleteProject(id: String!): Project

        createProjectQuery(projectQuery: CreateProjectQueryInput!): ProjectQuery
        updateProjectQuery(projectQuery: UpdateProjectQueryInput!): ProjectQuery
        deleteProjectQuery(id: String!): ProjectQuery
    }

    input CreateUserInput {
        email: String!
        password: String!
        projects: [String]
    }

    input UpdateUserInput {
        id: String!
        email: String
        password: String
    }

    input CreateProjectInput {
        userID: String!
        name: String!
        queries: [String]
    }

    input UpdateProjectInput {
        id: String!
        name: String
    }

    input CreateProjectQueryInput {
        projectID: String!
        name: String!
        depth: Int!
        complexity: Int!
        time: Int!
    }

    input UpdateProjectQueryInput {
        id: String!
        name: String
        depth: Int
        complexity: Int
        time: Int
    }
`;

export default typeDefs;
