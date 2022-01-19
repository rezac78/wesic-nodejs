const mongoose = require('mongoose');
const { schema } = require('./service/UserValidation');

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.statics.userValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("User", UserSchema)