const { model, Schema, default: mongoose } = require('mongoose')


const blogSchema = new Schema ({
    title: { required: true, type: String },
    body: { required: true, type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

const Blog = model('Blog', blogSchema)

module.exports = Blog