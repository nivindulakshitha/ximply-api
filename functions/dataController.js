const mongoose = require("mongoose")
const cryptojs = require("crypto-js")
require("dotenv").config()
const Credential = require("../models/Credential")
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
})

const authStudent = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const credential = await Credential.findOne({ "username": username }).lean();
    console.log(credential)

    if (!credential) {
        return res.status(204).json({ "username": username, "error": "No such username can be found" })
    } else {
        const decryptedPassword = decryptPassword(credential.password);
        if (decryptedPassword == password) {
            return res.status(200).json(credential)
        } else {
            return res.status(205).json({ "username": username, "error": "Password cannot be matched" })
        }
    }
}

const registerStudent = async (req, res) => {
    const { username, password } = req.body;

    const newUser = new Credential({
        username: username,
        password: encryptPassword(password)
    })

    try {
        await newUser.save();
        return res.status(200).json({ "message": "User successfully added", "username": username });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ "message": "An error occurred while adding the user", "username": username, "error": error.message });
    }
}

const encryptPassword = (password) => {
    const key = process.env.ENCRYPTION_KEY;
    return cryptojs.AES.encrypt(password, key).toString();
}

const decryptPassword = (password) => {
    const key = process.env.ENCRYPTION_KEY;
    return cryptojs.AES.decrypt(password, key).toString(cryptojs.enc.Utf8);
}

module.exports = {
    registerStudent,
    authStudent
}