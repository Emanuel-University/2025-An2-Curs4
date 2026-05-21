import { Router } from "express";

import {
  authController,
  refreshController,
} from "../controler/authControler.js";
const router = Router();

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await authController(username, password);
  res.send(result);
});

router.post("/refresh", async (req, res) => {
  const result = await refreshController(req.body.refreshToken);
  res.status(result.success ? 200 : 401).send(result);
});

export default router;
