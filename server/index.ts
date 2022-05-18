import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import compression from "compression";
import cors from "cors";

import { typeDefs } from "./models/TypeDefs";
import { resolvers } from "./models/Resolvers";

import { userRouter } from "./routes/User";

const app: express.Application = express();
const PORT: number = (process.env.port as any as number) || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(7)],
});

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use("/user", userRouter);

// go to localhost:3000/gql to use apollo playground
server.start().then((): void => {
  server.applyMiddleware({ app, path: "/gql" });
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
