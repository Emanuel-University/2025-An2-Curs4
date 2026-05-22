import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/task.model.js", () => ({
  Task: {
    findAll: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    destroy: vi.fn(),
  },
}));

vi.mock("../database/entities/description.model.js", () => ({
  Description: { create: vi.fn() },
}));

vi.mock("../database/entities/client.model.js", () => ({
  Client: {},
}));

vi.mock("../database/db.js", () => ({
  sequelize: {},
}));

const { Task } = await import("../database/entities/task.model.js");
const { default: taskRouter } = await import("./taskRouter.js");

const app = express();
app.use(express.json());
app.use("/", taskRouter);

const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

describe("PUT /update-done", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Populate the internal tasks array via GET /get-all
    Task.findAll.mockResolvedValue([
      {
        dataValues: {
          id: 1,
          title: "Test Task",
          done: 0,
          favorite: 0,
          Client: null,
        },
      },
    ]);
    await fetch(`${baseUrl}/get-all`);
  });

  it("returns { success: true }", async () => {
    Task.update.mockResolvedValue([1]);

    const res = await fetch(`${baseUrl}/update-done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
  });

  it("calls Task.update with done toggled to true when task starts as false", async () => {
    Task.update.mockResolvedValue([1]);

    await fetch(`${baseUrl}/update-done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }),
    });

    expect(Task.update).toHaveBeenCalledWith(
      { done: true },
      { where: { id: 1 } },
    );
  });

  it("toggles done back to false on a second call", async () => {
    Task.update.mockResolvedValue([1]);

    // First toggle: false -> true
    await fetch(`${baseUrl}/update-done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }),
    });

    // Second toggle: true -> false
    await fetch(`${baseUrl}/update-done`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }),
    });

    expect(Task.update).toHaveBeenLastCalledWith(
      { done: false },
      { where: { id: 1 } },
    );
  });
});
