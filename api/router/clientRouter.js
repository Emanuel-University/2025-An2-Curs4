import { Router } from "express";
import { Client } from "../database/entities/client.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const client = [];
  const clientsFromDB = await Client.findAll();
  clientsFromDB.forEach((client) => {
    client.push({
      id: client.dataValues.id,
      name: client.dataValues.name,
    });
  });

  res.send(client);
});

export default router;
