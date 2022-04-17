import request from "supertest";
import { app } from "../../app";

it("responds with details of the current user", async () => {
  const signup_response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "testtest" })
    .expect(201);
  const cookie = signup_response.get("Set-Cookie");
  const respose = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(respose.body.currentUser.email).toEqual("test@test.com");
});
