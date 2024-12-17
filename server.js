const express = require('express')
require("dotenv").config
const cors = require('cors')
const connectDb = require("./config/db")
const wordRoute = require("./routes/wordRoute")

const app = express()

app.use(express.json())
app.use(cors())

connectDb()

app.use("/api/sign", wordRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Listening to Port ${PORT} `))
