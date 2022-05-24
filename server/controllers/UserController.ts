import { Request, Response, NextFunction } from 'express';

const bcrypt = require('bcryptjs');
const validator = require('email-validator'); // validate real emails - we can activate it later in the process, just put it as a middleware before signup middleware
const User = require('../models/User');

export default class UserController {
    static validate(req: Request, res: Response, next: NextFunction) {
        return validator.validate(req.body.email) ? next() : next({ err: 'Email wrong format' });
    }

    static getUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        return User.findById(id)
            .then((student: object) => {
                res.locals.user(student);
                return next();
            })
            .catch((err: Error) => next({ err }));
    }

    static async getUsers(req: Request, res: Response, next: NextFunction) {
        return User.find()
            .then((users: object) => {
                res.locals.users = users;
                return next();
            })
            .catch((err: Error) => next({ err }));
    }

    static createUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        return User.findOne({ email }) // if the user with this email doesn't exist
            .then((data: Object) => {
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
                            res.locals.user = result;
                            return next();
                        })
                        .catch((err: Error) => next({ err }));
                }
                return next({ err: 'email already etc etc' });
            });
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        // I will write a code to update email/pass not the apps, since we still have to figure out out apps object property for user model
        const passInside = req.body.password;
        const { id } = req.params;

        const pass = await bcrypt.hash(passInside, 12);

        const update = User.findByIdAndUpdate(
            id,
            { email: req.body.email, password: pass },
            { new: true }
        )
            .then((student: object) => {
                res.locals.user = student;
                return next();
            })
            .catch((err: Error) => next({ err }));

        return update;
    }

    static deleteUser(req: Request, res: Response, next: NextFunction) {
        User.findByIdAndRemove(req.params.id)
            .then((user: object) => {
                res.locals.user = user;
                return next();
            })
            .catch((err: Error) => next({ err }));
    }
}
