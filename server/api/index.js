/** @format */

const express = require("express");
const app = express();
require("dotenv").config();
const passport = require("passport");
require("express-async-errors");
const connect = require("./db/db");
const authRouter = require("./routes/auth-route");
const routePub = require("./routes/pub-route");
const routemsg = require("./routes/route-msg");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const protectedRoute = require("./routes/protected-route");
require("./middleware/passport");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//io listener
io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);

  //pub send
  socket.on("send_pub", (data) => {
    //createPub(data, null);
    io.emit("receive_pub", data);
  });

  //comment send
  socket.on("send_comment",(data)=>{
    io.emit("receive_comment" , data)
  }) 

  //react send
  socket.on("send_react",(data)=>{
    io.emit("receive_react" , data)
  }) 
});

app.use(express.json());
app.use("/api/v1", authRouter);
app.use("/api", routePub);
app.use("/api", routemsg);

app.use(
  "/api/v1/protected",
  passport.authenticate("jwt", { session: false }),
  protectedRoute
);
app.use(errorHandler);
app.use(notFound);

const connectToDb = async () => {
  try {
    await connect(process.env.MONGO_URI);

    server.listen(5000, console.log("server is listening on port 5000..."));
  } catch (error) {
    console.log(error);
  }
};

connectToDb();
