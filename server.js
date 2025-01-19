const express = require("express");
const cors = require("cors");
const error = require("./middlewares/error-handler");
const wordRoute = require("./routes/wordRoute");
const authRoute = require("./routes/auth-route");

//  ************        Environment variables configuration     **************

require("dotenv").config();

//  **********      Database Connection         **********
require("./config/db-connection");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/sign", wordRoute);
app.use("/api/auth", authRoute);

app.get("/test", async (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening to Port ${PORT} `));

app.use(error);
