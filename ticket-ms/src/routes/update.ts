import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
  NotAuthorisedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@aa-ticketing/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    console.log(ticket);
    if (!ticket) {
      console.log("TICKET", ticket);
      throw new NotFoundError();
    }
    console.log("Found Ticket", ticket);
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
