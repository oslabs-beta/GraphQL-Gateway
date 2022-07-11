import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import UserDB from '../models/User';
import sessions from '../utilities/sessions';

const authRouter = express.Router({
    strict: true,
});

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

type TokenResponse = {
    data: GithubToken;
};

interface GithubToken {
    access_token: string;
    token_type: string;
}
interface GithubUser {
    id: string;
}

authRouter.get('/', (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
        .type('html')
        .redirect(
            `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user,user:email`
        );
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
        .then((tokenResponse: TokenResponse) => tokenResponse.data)
        .then((tokenData) => {
            axios
                .get('https://api.github.com/user/emails', {
                    headers: { Authorization: `token ${tokenData.access_token}` },
                })
                .then(async (userResponse) => {
                    const { email } = userResponse.data.find(
                        (address: { primary: boolean }) => address.primary
                    );
                    try {
                        let user: User | null = await UserDB.findOne({ email });

                        // if user does not exist yet. create a new account in the database
                        if (!user) {
                            const newUser = new UserDB({
                                email,
                                projects: [],
                            });
                            user = await newUser.save();
                            if (!user)
                                throw new Error(
                                    'Could not create an account for this user. Try again later.'
                                );
                        }
                        // create a session
                        const token = sessions.create({ id: user.id });
                        res.status(200).json({
                            token,
                            id: user.id,
                            email: user.email,
                        });
                    } catch (err) {
                        throw new Error(`Error ${err}`);
                    }
                });
            // .catch((err) => console.log(err));
        })
        .catch((err: string) => {
            console.log(err);
            return next(err);
        });
});

export default authRouter;
