import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../database/entities/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_TOKEN_EXPIRES_IN = "1m";
const REFRESH_TOKEN_EXPIRES_IN = "5m";

function signAccessToken(user) {
  return jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.username,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );
}

function signRefreshToken(userId) {
  return jwt.sign({ id: userId, type: "refresh" }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

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

  const token = signAccessToken(user);
  const refreshToken = signRefreshToken(user.dataValues.id);

  return { success: true, token, refreshToken };
}

export async function refreshController(refreshToken) {
  if (!refreshToken) {
    return { success: false, message: "Refresh token is required" };
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    if (payload.type !== "refresh") {
      return { success: false, message: "Invalid refresh token" };
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      return { success: false, message: "Invalid refresh token" };
    }

    const token = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user.dataValues.id);

    return { success: true, token, refreshToken: newRefreshToken };
  } catch {
    return { success: false, message: "Invalid refresh token" };
  }
}
