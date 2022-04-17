import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validaion-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../Models/users";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // User not found
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    // User exists
    // Compare password
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // JWT_KEY was already checked in index.ts at start up
      // Thus the exclamation mark
      process.env.JWT_KEY!
    );

    // Store it on session object

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
