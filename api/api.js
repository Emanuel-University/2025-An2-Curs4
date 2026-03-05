import express from "express";
import bodyParser from "body-parser";

const api = express();
const port = 3000;

const router = express.Router();

api.use(
  "/university",
  router.get("/", (req, res) => {
    res.send("Hello World!");
  }),
  router.get("/an2", (req, res) => {
    res.send(JSON.stringify({ name: "An2" }));
  }),
);

api.use(bodyParser.json());

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
