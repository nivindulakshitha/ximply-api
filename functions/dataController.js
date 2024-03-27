const mongoose = require("mongoose")
const cryptojs = require("crypto-js")
require("dotenv").config()
const Credential = require("../models/Credential")
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
})

const authStudent = async (req, res) => {
    const { username, password } = req.body;
    const credential = await Credential.findOne({ "username": username });

    if (!credential) {
        return res.status(404).json({ "username": username, "error": "No such username can be found" })
    } else {
        const decryptedPassword = decryptPassword(credential.password);
        if (decryptedPassword == password) {
            credential.password = decryptedPassword
            res.status(200).json(credential)
        }
    }

}

const registerStudent = async (req, res) => {
    const { username, password } = req.body;

    const newUser = new Credential({
        username: username,
        password: encryptPassword(password)
    })

    await newUser.save().then(() => {
        return res.status(200).json({ "message": "User added", "username": username })
    }).catch(error => {
        return res.status(400).json({ "message": "User was not added", "username": username, "error": error })
    })
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