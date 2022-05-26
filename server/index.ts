import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import querystring from 'querystring';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db';
import typeDefs from './schema/TypeDefs';
import resolvers from './schema/Resolvers';

import userRouter from './routes/User';

const axios = require('axios');

dotenv.config();
connectDB();

const app: express.Application = express();
const PORT: number = (process.env.port as any as number) || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

app.get('/auth', (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.get('/oauth-callback', (req, res) => {
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
        .post(`https://github.com/login/oauth/access_token`, body, opts)
        .then((response: object | any) => response.data)
        .then((data: object) => console.log('this is data', data))
        // .then((_token: string) => {
        //     console.log('My token:', _token);
        //     // here we can use the user's email from github acc and create a new user in our DB with token as password
        //     // if someone has a different approach please do tell
        //     res.redirect(`http://localhost:8080/`);
        // })
        .catch((err: string) => console.log(err));
});

// export interface GitHubUser {
//     login: string;
//     id: number;
//     node_id: string;
//     avatar_url: string;
//     gravatar_id: string;
//     url: string;
//     html_url: string;
//     followers_url: string;
//     following_url: string;
//     gists_url: string;
//     starred_url: string;
//     subscriptions_url: string;
//     organizations_url: string;
//     repos_url: string;
//     events_url: string;
//     received_events_url: string;
//     type: string;
//     site_admin: boolean;
//     name: string;
//     company: null;
//     blog: string;
//     location: string;
//     email: null;
//     hireable: null;
//     bio: null;
//     twitter_username: null;
//     public_repos: number;
//     public_gists: number;
//     followers: number;
//     following: number;
//     created_at: Date;
//     updated_at: Date;
// }

// const secret = 'shhhhhhhhhhhh';
// const COOKIE_NAME = 'github-jwt';

app.use(cors());

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

app.use('/api/users', userRouter);

// localhost:3000/gql -> graphQL sandbox
server.start().then((): void => {
    server.applyMiddleware({ app, path: '/gql' });
    app.listen(PORT, () => console.log(`[Server] Started on port :${PORT}`));
});
