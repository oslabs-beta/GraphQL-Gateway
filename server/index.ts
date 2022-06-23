import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db';
import typeDefs from './schema/TypeDefs';
import resolvers from './schema/Resolvers';
import authRouter from './routes/Auth';
import userRouter from './routes/User';

connectDB();

const app: express.Application = express();
const PORT: number = (process.env.port as any as number) || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(cors());

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/auth', authRouter);

// localhost:3000/gql -> graphQL sandbox
server.start().then((): void => {
    server.applyMiddleware({ app, path: '/gql' });
    app.listen(PORT, () => console.log(`[Server] Started on port :${PORT}`));
});
