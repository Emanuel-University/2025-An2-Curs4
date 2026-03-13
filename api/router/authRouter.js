import { Router } from "express";

const router = Router();

const USERNAME = "admin";
const PASSWORD = "admin";

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === USERNAME && password === PASSWORD) {
    res.send({ success: true, message: "Login successful" });
  } else {
    res.send({ success: false, message: "Login failed" });
  }
});

export default router;
