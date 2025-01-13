const express = require("express");
require("dotenv").config;
const cors = require("cors");
const error = require("./middlewares/error-handler");
const wordRoute = require("./routes/wordRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/sign", wordRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening to Port ${PORT} `));

app.use(error);
