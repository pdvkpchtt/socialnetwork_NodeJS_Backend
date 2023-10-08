const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const { pool } = require("./db");
var session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.json()); // из за этой строки я убил все нервные клетки
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
