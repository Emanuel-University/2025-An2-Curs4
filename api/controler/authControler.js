import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../database/entities/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function authController(username, password) {
  if (!username || !password) {
    return { success: false, message: "Username and password are required" };
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.dataValues.password,
  );
  if (!isValidPassword) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.username,
    },
    JWT_SECRET,
    { expiresIn: "1m" },
  );

  return { success: true, token };
}
