import { gql } from "apollo-server-express";

export const typeDefs = gql`
"""below is filler b/c errors are thrown if typeDefs is empty"""
    type User {
        username: String
    }

    type Query {
        users: [User]
    }
`;
