import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import lodash from 'lodash';

import { fileURLToPath } from 'url';
import typeDefs from './schema/TypeDefs';
import ProjectResolvers from './schema/ProjectResolvers';
import UserResolvers from './schema/UserResolvers';
import ProjectQueryResolvers from './schema/ProjectQueryResolvers';
import RateLimiterConfigResolvers from './schema/RateLimiterConfigResolvers';

import connectDB from './db';
import ProjectDB from './models/Project';
import session from './utilities/sessions';

import rateLimiterAnalysis from './utilities/rateLimiterAnalysis';

connectDB();

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers: lodash.merge(
        ProjectResolvers,
        UserResolvers,
        ProjectQueryResolvers,
        RateLimiterConfigResolvers
    ),
    persistedQueries: false,
    context: async ({ req }) => {
        const authHeader = req.headers.authorization || null;
        if (!authHeader) return { authenticated: false, user: null };

        const token = authHeader?.split(' ')[1];
        if (!token) return { authenticated: false, user: null };

        const user = await session.verify(token);
        return { authenticated: user.authenticated, user: user.data };
    },
});

app.use(cors());

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const filename = fileURLToPath(import.meta.url);

if (process.env.NODE_ENV?.trim() === 'production') {
    app.use(express.static(path.join(__dirname, '../../build')));
} else {
    app.use(express.static(path.join(path.dirname(filename), '../client/')));
}

// localhost:3000/gql -> graphQL sandbox
server.start().then((): void => {
    server.applyMiddleware({ app, path: '/gql' });

    app.post('/api/projects/rateLimit/:projectId', rateLimiterAnalysis, (req, res) =>
        // Send back re-analyzed data
        res.json(res.locals)
    );

    // for logger to cross reference project DB api key to request auth header
    app.get('/key/:projectID', async (req, res) => {
        const project = await ProjectDB.findById(req.params.projectID).catch((err) =>
            res.status(404).send(new Error(`Project not found: ${err}`))
        );

        const apiKey = { project };

        if (project && apiKey) return res.json(apiKey);
        if (project) return res.status(500).send('Error: Project in DB does not contain API key');
        return res.status(500).send('DB returned project as null');
    });

    app.listen(typeof PORT === 'string' ? Number(PORT) : PORT, () =>
        // eslint-disable-next-line no-console
        console.log(`[Server] Started on port :${PORT}`)
    );
});
