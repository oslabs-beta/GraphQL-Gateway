import { gql } from 'apollo-server-express';

const typeDefs = gql`
    "below is filler b/c errors are thrown if typeDefs is empty"
    type User {
        id: ID!
        email: String!
    }

    type Query {
        users: [User]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        deleteUser(id: ID!): User
    }

    input CreateUserInput {
        email: String!
    }

    input UpdateUserInput {
        id: ID!
        email: String
    }
`;

export default typeDefs;
