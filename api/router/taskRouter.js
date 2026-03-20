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

router.delete("/delete", (req, res) => {
  const id = req.body.id;
  tasks.splice(
    tasks.findIndex((task) => task.id === id),
    1,
  );
  res.send({ success: true });
});

router.put("/update-title", (req, res) => {
  const id = req.body.id;
  const newTitle = req.body.newTitle;
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].title = newTitle;
  res.send({ success: true });
});

router.put("/update-done", (req, res) => {
  const id = req.body.id;
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].done = !tasks[index].done;
  res.send({ success: true });
});

router.put("/update-favorite", (req, res) => {
  const id = req.body.id;
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].favorite = !tasks[index].favorite;
  res.send({ success: true });
});

export default router;
