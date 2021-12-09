const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    tiktok: {
        type: Boolean,
        default: false
    }
})

module.exports = model('User', UserSchema)