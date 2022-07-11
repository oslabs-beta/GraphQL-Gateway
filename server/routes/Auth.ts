import 'dotenv/config';
import express, { Request, Response } from 'express';
import axios from 'axios';
import sessions from '../utilities/sessions';

const authRouter = express.Router({
    strict: true,
});

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

type ResObj = {
    data: object;
};

authRouter.get('/', (req: Request, res: Response) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`
    );
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
        .then((data: any) => {
            axios
                .get('https://api.github.com/user/emails', {
                    headers: {
                        Authorization: `token ${data.access_token}`,
                    },
                })
                .then((returnedData) => console.log('this is returned data', returnedData))
                .catch((err) => console.log(err));
        });

    // // eslint-disable-next-line no-console
    // .then((data: object) => {
    //     console.log('this is data', data);
    //     // check if there already is a user with this email, get _id
    //     // if there isn't, create a new user
    //     // create a session
    //     // sessions.create({id:  /** user _id */})
    // })
    // .then(() => res.redirect('http://localhost:8080/'))
    // // eslint-disable-next-line no-console
    // .catch((err: string) => console.log(err));
});

// authRouter.get('/https://api.github.com/user/emails', (req: Request, res: Response) => {
//     axios
//         .get('/https://api.github.com/user/emails')
//         .then((response: ResObj) => response.data)
//         // eslint-disable-next-line no-console
//         .then((data: object) => {
//             console.log('this is data', data);
//             // check if there already is a user with this email, get _id
//             // if there isn't, create a new user
//             // create a session
//             // sessions.create({id:  /** user _id */})
//         })
//         .then(() => res.redirect('http://localhost:8080/'))
//         // eslint-disable-next-line no-console
//         .catch((err: string) => console.log(err));
// });

export default authRouter;
