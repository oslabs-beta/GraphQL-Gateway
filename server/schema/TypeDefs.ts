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
        apiKey: String
    }

    type ProjectQuery {
        id: ID!
        userID: String!
        projectID: String!
        number: Int!
        complexity: Int!
        depth: Int!
        tokens: Int!
        success: Boolean!
        timestamp: Int!
        logged_on: Int!
        latency: Int
    }

    type Query {
        users: [User!]!
        user(id: String!): User

        projects: [Project]!
        project(id: String!): Project

        projectQueries: [ProjectQuery]!
        projectQuery(id: String!): ProjectQuery
    }

    type Mutation {
        createUser(user: CreateUserInput!): User
        updateUser(user: UpdateUserInput!): User
        deleteUser(id: String!): User

        createProject(project: CreateProjectInput!): Project
        updateProject(project: UpdateProjectInput!): Project
        deleteProject(id: String!): Project

        createProjectQuery(projectQuery: CreateProjectQueryInput!): ProjectQuery
        deleteProjectQuery(id: String!): ProjectQuery
    }

    input CreateUserInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        id: String!
        email: String
        password: String
    }

    input CreateProjectInput {
        userID: String!
        name: String!
    }

    input UpdateProjectInput {
        id: String!
        name: String
    }

    input CreateProjectQueryInput {
        projectID: String!
        complexity: Int!
        depth: Int!
        tokens: Int!
        success: Boolean!
        timestamp: Int!
        logged_on: Int!
        latency: Int
    }
`;

export default typeDefs;
