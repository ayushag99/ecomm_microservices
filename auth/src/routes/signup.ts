import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../Models/users";
import { RequestValidationError } from "../errors/request-validaion-error";
import { BadRequestError } from "../errors/bad-request-error";

import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // JWT_KEY was already checked in index.ts at start up
      // Thus the exclamation mark
      process.env.JWT_KEY!
    );

    // Store it on session object

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
