import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import connectDB from './config/db';

import typeDefs from './schema/TypeDefs';
import resolvers from './schema/Resolvers';

import userRouter from './routes/User';

import ProjectDB from './models/Project';

dotenv.config();
connectDB();

const app: express.Application = express();
const PORT: number = (process.env.port as any as number) || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use('/api/users', userRouter);

// for testing
app.get('/api/projects', async (req, res) => {
    const projects = await ProjectDB.find();
    return res.json(projects);
});

// localhost:3000/gql -> graphQL sandbox
server.start().then((): void => {
    server.applyMiddleware({ app, path: '/gql' });
    app.listen(PORT, () => console.log(`[Server] Started on port :${PORT}`));
});
