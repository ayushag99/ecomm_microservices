import express, { Request, Response } from "express";
import { currentUser } from "@aa-ticketing/common";

const router = express.Router();

// Check user is logged in or not, current user
router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser });
  }
);

export { router as currentUserRouter };
