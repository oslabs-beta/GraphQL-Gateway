import express, { Request, Response } from 'express';
import userController from '../controllers/UserController';

const userRouter = express.Router({
    strict: true,
});

userRouter.get('/', userController.getUsers, (req: Request, res: Response) =>
    res.status(200).json(res.locals.users)
);

userRouter.get('/:userID', userController.getUser, (req: Request, res: Response) =>
    res.status(200).json(res.locals.user)
);

userRouter.post('/', userController.createUser, (req: Request, res: Response) =>
    res.status(200).json(res.locals.user)
);

userRouter.put('/:userID', userController.updateUser, (req: Request, res: Response) =>
    res.status(200).json(res.locals.user)
);

userRouter.delete('/:userID', userController.deleteUser, (req: Request, res: Response) =>
    res.status(200).json(res.locals.user)
);

export default userRouter;
