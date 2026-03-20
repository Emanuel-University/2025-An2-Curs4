import { Router } from "express";

import { authController } from "../controler/authControler.js";
const router = Router();

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = authController(username, password);
  res.send(result);
});

export default router;
