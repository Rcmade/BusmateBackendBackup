require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser");
const http = require("http"); // import http module

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
app.use("/api/admin", adminRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 4444;
server.listen(PORT, () => console.log("Server running on port ", PORT));
// app.close();

// Now Initial app is done
