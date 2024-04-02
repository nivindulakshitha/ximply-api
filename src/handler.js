const express = require("express")
const router = express.Router()
const { registerStudent, authStudent } = require("./dataController")

router.post("/reg", registerStudent)
router.post("/auth", authStudent)

module.exports = router;