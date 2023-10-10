const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const session = require("express-session");
const Redis = require("ioredis");
const redisClient = new Redis();
const RedisStore = require("connect-redis").default;

require("dotenv").config();

const app = express();

app.use(express.json()); // из за этой строки я убил все нервные клетки
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

// auth
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
