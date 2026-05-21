import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRouter from "./router/authRouter.js";
import taskRouter from "./router/taskRouter.js";
import clientRouter from "./router/clientRouter.js";
import universityRouter from "./router/universityRouter.js";

import authMiddleware from "./middleware/authMiddleware.js";

const api = express();
const port = 3000;

api.use(bodyParser.json());

// Use cors middleware for proper CORS handling
api.use(
  cors({
    origin: "http://localhost:5174", // Frontend origin
    credentials: true, // Allow credentials (cookies, Authorization header)
  }),
);

api.use("/auth", authRouter);
api.use("/client", authMiddleware, clientRouter);
api.use("/task", authMiddleware, taskRouter);
api.use("/university", authMiddleware, universityRouter);

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
