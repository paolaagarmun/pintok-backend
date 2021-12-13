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

UserSchema.methods.toJSON = function () {
    const { password, __v, ...user } = this.toObject();
    return user
}

module.exports = model('User', UserSchema)