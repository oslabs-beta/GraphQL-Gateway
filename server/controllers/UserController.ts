import { Request, Response, NextFunction } from 'express';

const bcrypt = require('bcryptjs');
const validator = require('email-validator'); // validate real emails - we can activate it later in the process, just put it as a middleware before signup middleware
const User = require('../models/User');

export default class UserController {
    static validate(req: Request, res: Response, next: NextFunction) {
        if (validator.validate(req.body.email)) {
            console.log('PASSED');
            next();
        } else {
            res.sendStatus(403);
        }
    }

    static getUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        User.findById(id)
            .then((student: object) => {
                res.send(student);
            })
            .catch((err: string) => console.log(err));
        // placeholder
        // res.locals.user = { id: '1', email: '1' };

        // return next();
    }

    static getUsers(req: Request, res: Response, next: NextFunction) {
        User.find()
            .then((users: object) => {
                res.locals.users = users;
                console.log('users', users);
            })
            .then(() => next())
            .catch((err: string) => console.log('printing error', err));
        // // try-catch db query here

        // // placeholder
        // res.locals.users = [
        //     { id: '1', email: '1' },
        //     { id: '2', email: '2' },
        // ];
    }

    static createUser(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        const { password } = req.body;

        User.findOne({ email }) // if the user with this email doesn't exist
            .then((data: any) => {
                // create one using bcrypt hashing for password
                if (!data) {
                    return bcrypt
                        .hash(password, 12)
                        .then((savedPassword: string) => {
                            const user = new User({
                                email,
                                password: savedPassword,
                            });
                            // now here we should create session to persist while logged in
                            return user.save();
                        })
                        .then((result: object) => {
                            res.send(result);
                        })
                        .catch((error: string) => {
                            console.log(error);
                        });
                }
                console.log('email in already in use!');
                return res.sendStatus(403);
            });

        // placeholder
        // res.locals.user = { id: '1', email: '1' };

        // return next();
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        // I will write a code to update email/pass not the apps, since we still have to figure out out apps object property for user model
        const passInside = req.body.password;
        const { id } = req.params;

        console.log('this is id', id);

        const pass = await bcrypt.hash(passInside, 12);

        const update = await User.findByIdAndUpdate(
            id,
            { email: req.body.email, password: pass },
            { new: true }
        )
            .then((student: object) => {
                console.log('final', student);
                res.locals.user = student;
                return next();
            })
            .catch((err: string) => console.log(err));

        return update;
        // const { id } = req.body;

        // // try-catch db query here

        // // placeholder
        // res.locals.user = { id: '1', email: '1' };

        // return next();
    }

    static deleteUser(req: Request, res: Response, next: NextFunction) {
        User.findByIdAndRemove(req.params.id)
            .then((user: object) => {
                console.log('User deleted sucessfully!', user);
                return res.send(user);
            })
            .catch((err: string) => console.log(err));
    }
}
