import request from "supertest";
import { app } from "../../app";

it("responds with details of the current user", async () => {
  const cookie = await global.signin();
  const respose = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(respose.body.currentUser.email).toEqual("test@test.com");
});


it("responds with null if not authenticated", async () => {
  
  const respose = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
    console.log(respose)
  expect(respose.body.currentUser).toEqual(null);
});

