import request from "supertest";
import { app } from "../../app";

it("fails when email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "teset@dfsdf.com", password: "fsdfs" })
    .expect(400);
});

it("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "testtest" })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "etest" })
    .expect(400);
});

it("responds with a cookie when valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "testtest" })
    .expect(201);
  const respose = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "testtest" })
    .expect(200);

  expect(respose.get("Set-Cookie")).toBeDefined();
});
