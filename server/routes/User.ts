import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/UserController';

require('dotenv').config();

const userRouter = express.Router({
    strict: true,
});

userRouter.get('/', userController.getUsers, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.users);
});
// userRouter.get('/', userController.getUsers);

// userRouter.get('/:userID', userController.getUser, (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.user);
// });
userRouter.get('/:id', userController.getUser);

// userRouter.post(
//     '/',
//     userController.createUser,
//     (req: Request, res: Response, next: NextFunction) => {
//         return res.status(200).json(res.locals.user);
//     }
// );
userRouter.post('/', userController.createUser);

// userRouter.put('/:userID', userController.updateUser, (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.user);
// });
userRouter.put(
    '/:id',
    userController.updateUser,
    (req: Request, res: Response, next: NextFunction) => res.status(200).json(res.locals.user)
);

// userRouter.delete('/:userID', userController.deleteUser, (req: Request, res: Response) => {
//     return res.status(200).json(`User ${req.params.userID} deleted from DB.`);
// });
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
