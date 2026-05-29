import { vi } from "vitest";

const mockModel = () => ({
  findAll: vi.fn(),
  findOne: vi.fn(),
  findByPk: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  destroy: vi.fn(),
  count: vi.fn(),
  belongsTo: vi.fn(),
  hasMany: vi.fn(),
  hasOne: vi.fn(),
  belongsToMany: vi.fn(),
  sync: vi.fn(),
});

vi.mock("sequelize", () => ({
  Sequelize: vi.fn(() => ({
    define: vi.fn(mockModel),
    authenticate: vi.fn(),
    sync: vi.fn(),
    transaction: vi.fn(),
    query: vi.fn(),
    close: vi.fn(),
  })),
  DataTypes: {
    STRING: "STRING",
    TEXT: "TEXT",
    BOOLEAN: "BOOLEAN",
    INTEGER: "INTEGER",
    FLOAT: "FLOAT",
    DATE: "DATE",
    UUID: "UUID",
    UUIDV4: "UUIDV4",
    ENUM: vi.fn(),
  },
  Op: {},
}));
