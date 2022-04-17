import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Check user is logged in or not, current user
router.get("/api/users/currentuser", (req: Request, res: Response) => {
  // if (!req.session || !req.session.jwt) {
  if (!req.session?.jwt) {
      console.log("User not logged in ")
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    //   JWT verification fails
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
