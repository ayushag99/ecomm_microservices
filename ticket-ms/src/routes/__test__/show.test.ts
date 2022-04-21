import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns status of 404 if ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});

it("returns ticket if ticket is found", async () => {
  const ticket = {
    title: "Title",
    price: 200,
  };
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(201);

  const ticketResposne = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);
  expect(ticketResposne.body.title).toEqual(ticket.title);
  expect(ticketResposne.body.price).toEqual(ticket.price);
});
