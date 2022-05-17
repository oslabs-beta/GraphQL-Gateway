import express, { Request, Response } from "express";
import { userController } from "../controllers";

export const userRouter = express.Router({
  strict: true,
});

userRouter.post("/", (req: Request, res: Response) => {
  userController.create(req, res);
});

userRouter.get("/", (req: Request, res: Response) => {
  userController.read(req, res);
});

userRouter.put("/", (req: Request, res: Response) => {
  userController.update(req, res);
});

userRouter.delete("/", (req: Request, res: Response) => {
  userController.delete(req, res);
});
