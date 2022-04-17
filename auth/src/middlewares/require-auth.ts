import { NextFunction, Request, Response } from "express";
import { NotAuthorisedError } from "../errors/not-authorised";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }
  next();
};
