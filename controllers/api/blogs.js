const Blog = require('../../models/blog')

const indexBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const createBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.create(req.body)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const showBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
} 

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    indexBlogs,
    createBlog,
    showBlog,
    updateBlog,
    deleteBlog
}