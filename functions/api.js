const express = require("express");
const cors = require("cors")
require("dotenv").config();
const serverless = require("serverless-http")
const mongoose = require("mongoose")
const routeHandler = require("./handler")

api = express()
api.use(express.json())
api.use(cors())
api.use((req, res, next) => {
    next()
})

api.use("/api", routeHandler)

api.get("/api", (req, res) => {
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME
    }).then(() => {
        res.status(200).json({ "message": "Api is available at the moment." })
    }).catch(error => {
        res.status(400).json({ "message": error })
        console.log(error)
    })
})

api.get('/', (req, res) => {
    res.status(200).json({ "message": "Server is replied with status code 200." })
})

module.exports.handler = serverless(api)