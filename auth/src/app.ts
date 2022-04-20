import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@aa-ticketing/common";

const app = express();

// Traffic is beig proxied to this app by nginx
// To inform express that it is behind the proxt and
// To make express trust the data that is coming from a proxy
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false, 
        // secure: true, will only set cookie if https
        // On test env it is not https
        // Thus we set it to false if not in test env
        secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
