const { model, Schema } = require('mongoose');

const VideoModel = Schema({
    url: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    notes: {
        type: String
    }
})

module.exports = model('Video', VideoModel)