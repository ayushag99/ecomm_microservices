import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

let mongo: any;
beforeAll(async () => {
  // Setup environment varaible otherwise will throw error
  process.env["JWT_KEY"] = "ASDF";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// Easily handle loging in
declare global {
  var signin: () => string[];
}

global.signin = () => {
  // Build a JWT payload {id, email}
  const payload = {
    email: "test@test.com",
    id: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn on session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //  return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
