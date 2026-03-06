import express from "express";
import bodyParser from "body-parser";

import authRouter from "./router/authRouter.js";
import universityRouter from "./router/universityRouter.js";

const api = express();
const port = 3000;

api.use(bodyParser.json());

api.use("/auth", authRouter);
api.use("/university", universityRouter);

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
