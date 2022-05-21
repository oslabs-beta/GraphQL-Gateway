import { gql } from 'apollo-server-express';

const typeDefs = gql`
    "below is filler b/c errors are thrown if typeDefs is empty"
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    type Query {
        users: [User]!
        user(_id: String!): User
    }

    type Mutation {
        createUser(user: CreateUserInput!): User
        updateUser(user: UpdateUserInput!): User
        deleteUser(_id: String!): User!
    }

    input CreateUserInput {
        email: String!
        password: String!
    }

    input UpdateUserInput {
        _id: String!
        email: String
        password: String
    }
`;

export default typeDefs;
