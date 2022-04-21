import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@aa-ticketing/common";

import indexTicketRouter, { createTicketRouter, showTicketRouter } from "./routes";

const app = express();

// Traffic is beig proxied to this app by nginx
// To inform express that it is behind the proxt and
// To make express trust the data that is coming from a proxy
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// Authentication
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
