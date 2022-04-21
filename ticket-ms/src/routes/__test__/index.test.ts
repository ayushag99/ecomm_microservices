import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const createTicket = () => {
  const ticket = {
    title: "Title",
    price: 200,
  };
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket);
};

it("can fetch list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const respose = await request(app).get("/api/tickets").send().expect(200);

  expect(respose.body.length).toEqual(3);
});
