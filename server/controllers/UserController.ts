import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { CrudController } from "./CrudController";

export class UserController extends CrudController {
  public create(req: Request<ParamsDictionary>, res: Response): void {
    throw new Error("Method not implemented.");
  }
  public read(req: Request<ParamsDictionary>, res: Response): void {
    throw new Error("Method not implemented.");
  }
  public update(req: Request<ParamsDictionary>, res: Response): void {
    throw new Error("Method not implemented.");
  }
  public delete(req: Request<ParamsDictionary>, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
