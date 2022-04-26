import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const createTicket = (cookie: string[] | null = null) => {
  const ticket = {
    title: "Title",
    price: 200,
  };
  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie ? cookie : global.signin())
    .send(ticket);
};

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "adfdsf0",
      price: 20,
    })
    .expect(404);
});
it("returns a 401 if user is not authorised", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "adfdsf0",
      price: 20,
    })
    .expect(401);
});
it("returns a 401 if user does not own the ticket", async () => {
  const response = await createTicket();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "fdsfdsfdsf",
      price: 1000,
    })
    .expect(401);
});
it("returns a 400 if user provides invalid title or price", async () => {
  const cookie = global.signin();

  const response = await createTicket(cookie);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 1000,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      price: 1000,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Title",
      price: -4,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Title",
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({})
    .expect(400);
});
it("updates ticket if valid input", async () => {
  const cookie = global.signin();

  const response = await createTicket(cookie);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "This is a test for update",
      price: 1000,
    })
    .expect(200);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();
  expect(ticketResponse.body.title).toEqual("This is a test for update");
  expect(ticketResponse.body.price).toEqual(1000);
});
