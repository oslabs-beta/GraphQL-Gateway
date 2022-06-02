import 'dotenv/config';
import express, { Request, Response } from 'express';
import axios from 'axios';

const authRouter = express.Router({
    strict: true,
});

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

type ResObj = {
    data: object;
};

authRouter.get('/', (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

authRouter.get('/oauth-callback', (req: Request, res: Response) => {
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
        .post(`https://github.com/login/oauth/access_token`, body, opts)
        .then((response: ResObj) => response.data)
        // eslint-disable-next-line no-console
        .then((data: object) => console.log('this is data', data))
        .then(() => res.redirect('http://localhost:8080/'))
        // eslint-disable-next-line no-console
        .catch((err: string) => console.log(err));
});

export default authRouter;
