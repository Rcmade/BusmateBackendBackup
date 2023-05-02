require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser");
const http = require("http"); // import http module

const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/locationRoute");
const { errorHandler } = require("./middlewares/error");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
// const corsOption = {
//   credentials: true,
//   origin: ["http://localhost:8081/", "*"],
// };

// db connection

const server = http.createServer(app);

require("./Db/db");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// route middlewares
app.use("/api", authRoutes);
app.use("/api", locationRoutes);
app.use("/api/admin", adminRoutes);

// console.log(path.join(__dirname, "/test.html"));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "/test.html"));
// });

app.use(errorHandler);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send a message to the client every 5 seconds
  const interval = setInterval(() => {
    socket.emit("message", "Hello from the server!");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 4444;
server.listen(PORT, () => console.log("Server running on port ", PORT));
// app.close();

// Now Initial app is done
