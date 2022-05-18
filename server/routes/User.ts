import express, { Request, Response, NextFunction } from "express";
import { userController } from "../controllers";

export const userRouter = express.Router({
  strict: true,
});

userRouter.post(
  "/",
  userController.createUser,
  (req: Request, res: Response, next: NextFunction) => {
    return next();
  }
);

userRouter.get(
  "/",
  userController.getUsers,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.users);
  }
);

userRouter.get(
  "/:userID",
  userController.getUser,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
  }
);

userRouter.put(
  "/:userID",
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.user);
  }
);

userRouter.delete(
  "/:userID",
  (req: Request, res: Response) => {
    return res.status(200).json(`User ${req.params.userID} deleted from DB.`);
  }
);
