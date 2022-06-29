import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        projects: [Project]!
        project: Project
        token: String
    }

    type Project {
        id: ID!
        userID: String!
        name: String!
        queries: [ProjectQuery]!
        query: ProjectQuery
        apiKey: String
        endpoint: String
    }

    type ProjectQuery {
        id: ID!
        number: Int!
        userID: String!
        projectID: String!
        depth: Int!
        complexity: Int!
        tokens: Int!
        blocked: Boolean!
        timestamp: Int!
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
        login(user: UserInput!): User
        signup(user: UserInput!): User
        updateUser(user: UpdateUserInput!): User
        deleteUser(id: String!): User

        createProject(project: CreateProjectInput!): Project
        updateProject(project: UpdateProjectInput!): Project
        deleteProject(id: String!): Project

        createProjectQuery(projectQuery: CreateProjectQueryInput!): ProjectQuery
        updateProjectQuery(projectQuery: UpdateProjectQueryInput!): ProjectQuery
        deleteProjectQuery(id: String!): ProjectQuery
    }

    input UserInput {
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
        depth: Int!
        complexity: Int!
        tokens: Int!
        success: Boolean!
        timestamp: Int!
    }

    input UpdateProjectQueryInput {
        id: String!
        depth: Int
        complexity: Int
        time: Int
        tokens: Int
        success: Boolean
    }
`;

export default typeDefs;
