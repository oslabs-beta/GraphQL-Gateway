import { Request, Response, NextFunction } from "express";

export class UserController {
  getUser(req: Request, res: Response, next: NextFunction) {
    // placeholder
    res.locals.user = { id: "1", email: "1" };

    return next();
  }

  getUsers(req: Request, res: Response, next: NextFunction) {
    // try-catch db query here

    // placeholder
    res.locals.users = [
      { id: "1", email: "1" },
      { id: "2", email: "2" },
    ];

    return next();
  }

  createUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    // try-catch db query here

    // placeholder
    res.locals.user = { id: "1", email: "1" };

    return next();
  }

  updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;

    // try-catch db query here

    // placeholder
    res.locals.user = { id: "1", email: "1" };

    return next();
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;

    // try-catch db query here

    return next();
  }
}
