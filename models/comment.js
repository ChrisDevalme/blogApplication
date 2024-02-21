const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    blog: { type: mongoose.Schema.Types, ref: 'Blog' }
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)

module.exports = Comment