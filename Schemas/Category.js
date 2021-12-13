const { model, Schema } = require('mongoose')

const CategorySchema = Schema({
    name: {
        unique: true,
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Category', CategorySchema)