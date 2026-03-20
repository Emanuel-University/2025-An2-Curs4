import { Router } from "express";

const router = Router();

const tasks = [
  {
    id: 1,
    title: "Learn Vue",
    done: false,
    favorite: false,
  },
  {
    id: 2,
    title: "Learn Pinia",
    done: false,
    favorite: false,
  },
];

router.get("/get-all", (req, res) => {
  res.send(tasks);
});

router.post("/add", (req, res) => {
  tasks.push(req.body.task);
  console.log(tasks);
  res.send({ success: true });
});

export default router;
