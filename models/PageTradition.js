const mongoose = require('mongoose');
const {schema} = require('./service/postMusicValidation');

const adminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

adminSchema.statics.postValidation = function (body) {
    return schema.validate(body, { abortEarly: false })
}
module.exports = mongoose.model("PageTradition", adminSchema)