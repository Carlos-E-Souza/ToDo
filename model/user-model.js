const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 5 },
})

userSchema.methods.gerarAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.jwtPrivateKey
    )
    return token
}

const User = model("user", userSchema)

module.exports = {
    userSchema,
    User,
}
