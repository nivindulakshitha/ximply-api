const mongoose = require("mongoose")
const CredentialSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: "John Smith"
    },
    password: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true })

const Credential = mongoose.model("credential", CredentialSchema, "credentials");
module.exports = Credential;