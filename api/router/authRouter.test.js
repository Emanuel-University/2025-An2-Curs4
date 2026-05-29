import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../controler/authControler.js", () => ({
  authController: vi.fn(),
  refreshController: vi.fn(),
}));

const { authController, refreshController } = await import(
  "../controler/authControler.js"
);
const { default: authRouter } = await import("./authRouter.js");

const app = express();
app.use(express.json());
app.use("/", authRouter);

const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("POST /login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the result from authController", async () => {
    authController.mockResolvedValue({
      success: true,
      token: "access-token",
      refreshToken: "refresh-token",
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alice", password: "secret" }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      token: "access-token",
      refreshToken: "refresh-token",
    });
  });

  it("calls authController with username and password from body", async () => {
    authController.mockResolvedValue({ success: true, token: "t", refreshToken: "r" });

    await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alice", password: "secret" }),
    });

    expect(authController).toHaveBeenCalledWith("alice", "secret");
  });

  it("returns failure response when credentials are invalid", async () => {
    authController.mockResolvedValue({
      success: false,
      message: "Invalid credentials",
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alice", password: "wrong" }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: false,
      message: "Invalid credentials",
    });
  });

  it("returns failure when username and password are missing", async () => {
    authController.mockResolvedValue({
      success: false,
      message: "Username and password are required",
    });

    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    expect(await res.json()).toEqual({
      success: false,
      message: "Username and password are required",
    });
  });
});

describe("POST /refresh", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and new tokens on valid refresh token", async () => {
    refreshController.mockResolvedValue({
      success: true,
      token: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    const res = await fetch(`${baseUrl}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: "valid-refresh-token" }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      success: true,
      token: "new-access-token",
      refreshToken: "new-refresh-token",
    });
  });

  it("calls refreshController with the refreshToken from body", async () => {
    refreshController.mockResolvedValue({ success: true, token: "t", refreshToken: "r" });

    await fetch(`${baseUrl}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: "my-token" }),
    });

    expect(refreshController).toHaveBeenCalledWith("my-token");
  });

  it("returns 401 when refresh token is invalid", async () => {
    refreshController.mockResolvedValue({
      success: false,
      message: "Invalid refresh token",
    });

    const res = await fetch(`${baseUrl}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: "bad-token" }),
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      success: false,
      message: "Invalid refresh token",
    });
  });

  it("returns 401 when refresh token is missing", async () => {
    refreshController.mockResolvedValue({
      success: false,
      message: "Refresh token is required",
    });

    const res = await fetch(`${baseUrl}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      success: false,
      message: "Refresh token is required",
    });
  });
});
