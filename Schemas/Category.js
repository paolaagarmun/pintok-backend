const { model, Schema } = require('mongoose')

const CategorySchema = Schema({
    name: {
        unique: true,
        type: String,
        reuqired: true,
        trim: true
    }
})

module.exports = model('Category', CategorySchema)