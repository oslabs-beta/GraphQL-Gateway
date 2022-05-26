import express, { NextFunction, Request, Response } from 'express';
const axios = require('axios');
require('dotenv').config();

const authRouter = express.Router({
    strict: true,
});

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

authRouter.get('/', (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

authRouter.get('/oauth-callback', (req: Request, res: Response, next: NextFunction) => {
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
        .then(() => res.redirect('http://localhost:8080/'))
        .catch((err: string) => console.log(err));
});

export default authRouter;
