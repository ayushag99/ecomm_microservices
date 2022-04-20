import { app } from "./app";

import mongoose from "mongoose";
import config from "config";

//
//
// START SCRIPT => connect to DB  & start the application
//
//

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not found");
  }
  try {
    await mongoose.connect(config.get("database.url"));
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
  const PORT = config.get("app.port");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}..!`);
  });
};
start();
