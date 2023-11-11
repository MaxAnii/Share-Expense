const express = require("express");
const session = require("express-session");
const passportSetup = require("./passport");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth");
const mainRoute = require("./routes/mainRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const genFunc = require("connect-pg-simple");

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.POSTGRES_URL + "?sslmode=require",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day in milliseconds
    },
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/auth", authRoute);
app.use("/user", mainRoute);
app.get("/check", async (req, res) => {
  res.json({
    message: "connection successful",
  });
});

app.use(express.static(path.join(__dirname, "build")));
app.use("/", express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
