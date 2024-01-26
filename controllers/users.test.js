/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config();
const { login } = require("./users");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection to DB");
});

// ========================================================================================

const req = { body: { email: "te@te.te", password: "123456" } };
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("=== CHECK TO LOGIN ===", () => {
  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    const mongo = await db;
    await mongo.disconnect();
  });

  it("Login status 200...", async () => {
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Check token...", async () => {
    await login(req, res);
    expect(typeof res.json.mock.calls[0][0].token).toBe("string");
  });

  it("Check user...", async () => {
    await login(req, res);
    expect(typeof res.json.mock.calls[0][0].user.email).toBe("string");
    expect(typeof res.json.mock.calls[0][0].user.subscription).toBe("string");
  });
});
