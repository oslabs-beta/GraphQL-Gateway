import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import connectDB from './db';
import typeDefs from './schema/TypeDefs';
import resolvers from './schema/Resolvers';
import ProjectDB from './models/Project';

connectDB();

const app: express.Application = express();
const PORT: number | string = process.env.port || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

app.use(cors());

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

// localhost:3000/gql -> graphQL sandbox
server.start().then((): void => {
    server.applyMiddleware({ app, path: '/gql' });

    // for logger to cross reference project DB api key to request auth header
    app.get('/auth/:projectID', async (req, res) => {
        const project = await ProjectDB.findById(req.params.projectID).catch(
            (err) => new Error(`Project not found: ${err}`)
        );
        if (project && project.apiKey) {
            return res.json(project.apiKey);
        } else return res.status(500);
    });

    // serve homepage
    app.all('/', (req, res) =>
        res
            .setHeader('Content-Type', 'text/html')
            .sendFile(path.join(__dirname, '../public/index.html'))
    );

    app.listen(typeof PORT === 'string' ? Number(PORT) : PORT, () =>
        // eslint-disable-next-line no-console
        console.log(`[Server] Started on port :${PORT}`)
    );
});
