const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const db = require("./config/db");
const keys = require("./config/keys");
const Logger = require("./config/logger");
const pageRoute = require("./routes/pageRoute");
const userRoute = require("./routes/userRoute");
const personRoute = require("./routes/personRoute");
const profileRoute = require("./routes/profileRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const app = express();

const URI =
  "mongodb+srv://kenny:!Password123@nodetuts.wxybe.mongodb.net/?retryWrites=true&w=majority";

const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", () => {
  console.log("the user is connected");
});

io.on("connection", (socket) => {
  socket.on("add chat message", (msg) => {
    io.emit("add chat message", msg);
  });
  socket.on("delete chat message", (msg) => {
    io.emit("delete chat message", msg);
  });
});

app.set("io", io);

db()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

global.userAuth = null;
global.logger = Logger.createLogger({ label: "Chat App" });

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined", { stream: logger.stream }));
app.use(fileUpload());
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: URI, // provide mongoUrl option
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use("*", (req, res, next) => {
  userIn = req.session.userId;
  userId = req.session.userId;
  next();
});

app.use("/", pageRoute);
app.use("/users", userRoute);
app.use("/person", personRoute);
app.use("/profile", profileRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

app.use((req, res, next) => {
  res.status(404).render("errors/404");
});

const port = 3000;
server = http.listen(process.env.PORT || port, () => {
  console.log(`App started on port ${port}`);
});
