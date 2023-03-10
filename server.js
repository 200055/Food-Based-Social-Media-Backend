const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const tweetRoute = require("./routes/tweetRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const uploadRoute = require("./routes/uploadRoute");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
dotenv.config();


const app = express();


app.use(morgan("dev"));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/upload", uploadRoute);

const rootdir = path.resolve();

// serving the frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootdir, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(rootdir, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(4000, async () => {
  await connectDB();
  console.log(
    `Server running in development on port 4000`
  );
});

const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("Client Connected");
  socket.on("disconnect", () => {
    console.log("Client has left");
  });
});

module.exports = app;