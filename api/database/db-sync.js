import { sequelize } from "./db.js";

import bcrypt from "bcryptjs";

// Import all models so associations are registered before sync
import "./entities/task.model.js";
import "./entities/description.model.js";
import "./entities/client.model.js";
import "./entities/user.model.js";

import { User } from "./entities/user.model.js";

await sequelize.sync({ alter: true }).then(async () => {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      name: "Administrator",
      username: "admin",
      password: passwordHash,
      email: "admin@example.com",
      phone: "0000000000",
    },
  });

  console.log("FINISHED SUCCESS");
  process.exit(0);
});
