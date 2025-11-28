const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

require("dotenv").config();

const waterRouter = require("./routes/api/water");
const userRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "DreamTeam Water API",
    message: "Welcome to DreamTeam water server",
  });
});

app.use("/api/water", waterRouter);
app.use("/api/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
