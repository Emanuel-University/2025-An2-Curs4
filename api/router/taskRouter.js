import { Router } from "express";
import { Task } from "../database/entities/task.model.js";
import { Description } from "../database/entities/description.model.js";
import { Client } from "../database/entities/client.model.js";

const router = Router();

const tasks = [];

router.get("/get-all", async (req, res) => {
  tasks.length = 0;
  const tasksForDB = await Task.findAll({
    include: [{ model: Client }],
  });

  tasksForDB.forEach((task) => {
    tasks.push({
      id: task.dataValues.id,
      title: task.dataValues.title,
      done: Boolean(task.dataValues.done),
      favorite: Boolean(task.dataValues.favorite),
      client: task.dataValues.Client,
    });
  });

  res.send(tasks);
});

router.post("/add", async (req, res) => {
  const title = req.body.title;

  const task = await Task.create({
    title,
  });
  tasks.push(task);

  const description = await Description.create({
    text: title,
    TaskId: task.id,
  });

  res.send({
    id: task.dataValues.id,
    title: task.dataValues.title,
    done: false,
    favorite: false,
  });
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;

  await Task.destroy({ where: { id } });
  tasks.splice(
    tasks.findIndex((task) => task.id === id),
    1,
  );
  res.send({ success: true });
});

router.put("/update-title", async (req, res) => {
  const id = req.body.id;
  const newTitle = req.body.newTitle;

  await Task.update(
    {
      title: newTitle,
    },
    {
      where: { id },
    },
  );

  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].title = newTitle;
  res.send({ success: true });
});

router.put("/update-done", async (req, res) => {
  const id = req.body.id;
  const index = tasks.findIndex((task) => task.id === id);

  await Task.update(
    {
      done: !tasks[index].done,
    },
    {
      where: { id },
    },
  );

  tasks[index].done = !tasks[index].done;
  res.send({ success: true });
});

router.put("/update-favorite", async (req, res) => {
  const id = req.body.id;
  const index = tasks.findIndex((task) => task.id === id);

  await Task.update(
    {
      favorite: !tasks[index].favorite,
    },
    {
      where: { id },
    },
  );

  tasks[index].favorite = !tasks[index].favorite;
  res.send({ success: true });
});

export default router;
