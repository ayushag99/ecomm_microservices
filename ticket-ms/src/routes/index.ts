import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

export * from "./new";
export * from "./show";
export * from "./update"

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export default router;