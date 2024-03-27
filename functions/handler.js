const express = require("express")
const router = express.Router()
const { registerStudent, authStudent } = require("./dataController")

router.post("/reg", registerStudent)
router.get("/auth", authStudent)

module.exports = router;