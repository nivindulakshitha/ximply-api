const express = require("express");
const process = require("process");
const cors = require("cors")
require("dotenv").config();

api = express()
api.use(express.json())
api.use(cors())
api.use((req, res, next) => {
    next()
})

api.use("/api", (req, res) => {
    res.status(200).json({"message":"Api is available at the moment."})
})

api.get('/', (req, res) => {
    res.status(200).json({ "message": "Server is replied with status code 200." })
})

api.listen(process.env.PORT_NUMBER || 5000, () => {
    console.log("Server is listening!")
})