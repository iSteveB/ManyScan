const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

const mangasRoutes = require("./routes/mangas.routes");
const usersRoutes = require("./routes/users.routes");
const authRouter = require("./routes/authentication.router");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();
app.use(bodyParser.json());

//----- Headers & autorizations -----//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize
  .sync
  // {force: true}
  ()
  .then(() => console.log("database is ready"));

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'api ManyManga!");
});

// Middlewares

// Routes
app.use("/api/mangas", mangasRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRouter);

module.exports = app;
