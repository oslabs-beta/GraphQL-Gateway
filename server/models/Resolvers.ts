import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    users: async (parent, args, context) => {
      // try-catch db query here
      
      // placeholder
      return [
        { id: "1", email: "1" },
        { id: "2", email: "2" },
      ];
    },
    user: async (parent, args, context) => {
      // try-catch db query here

      // placeholder
      return { id: "1", email: "1" };
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const { email } = args.input;

      // try-catch db query here

      // placeholder
      return { id: "1", email };
    },
    updateUser: async (parent, args, context) => {
      const { id, email } = args.input;

      // try-catch db query here

      //placeholder
      return { id, email: "1" };
    },
    deleteUser: async (parent, args, context) => {
      const { id } = args;

      // try-catch db query here

      //placeholder
      return { id, email: "1" };
    },
  },
};

export default resolvers;
