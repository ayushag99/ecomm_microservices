import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request  from "supertest";

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
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const respose = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = respose.get("Set-Cookie");
  return cookie;
};
