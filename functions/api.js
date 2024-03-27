const express = require("express");
const cors = require("cors")
require("dotenv").config();
const serverless = require("serverless-http")

api = express()
api.use(express.json())
api.use(cors())
api.use((req, res, next) => {
    next()
})

api.get("/api", (req, res) => {
    res.status(200).json({ "message": "Api is available at the moment." })
})

api.get('/', (req, res) => {
    res.status(200).json({ "message": "Server is replied with status code 200." })
})

module.exports.handler = serverless(api)