import { gql } from 'apollo-server-express';

const typeDefs = gql`
    "below is filler b/c errors are thrown if typeDefs is empty"
    type User {
        email: String!
        password: String!
    }

    type Query {
        users: [User]!
        user(email: String!): User
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        deleteUser(email: String!): User
    }

    input CreateUserInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        id: ID!
        email: String
    }
`;

export default typeDefs;
