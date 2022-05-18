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
  (req: Request, res: Response, next: NextFunction) => {
    return next();
  }
);

userRouter.get(
  "/:userID",
  userController.getUser,
  (req: Request, res: Response, next: NextFunction) => {
    return next();
  }
);

userRouter.put(
  "/:userID",
  (req: Request, res: Response, next: NextFunction) => {
    return next();
  }
);

userRouter.delete(
  "/:userID",
  (req: Request, res: Response, next: NextFunction) => {
    return next();
  }
);
