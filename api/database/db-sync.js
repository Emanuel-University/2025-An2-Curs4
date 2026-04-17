import { sequelize } from "./db.js";

// Import all models so associations are registered before sync
import "./entities/task.model.js";
import "./entities/description.model.js";
import "./entities/client.model.js";
import "./entities/user.model.js";

await sequelize.sync({ alter: true }).then(() => {
  console.log("FINISHED SUCCESS");
  process.exit(0);
});
