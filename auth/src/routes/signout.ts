import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // Ask user to clear cookie
  req.session = null;
  res.send({});
});

export { router as signOutRouter };
