const Blog = require('../../models/blog')

const indexBlogs = async (_, res, next) => {
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
        req.body.user = req.user._id
        const blog = await Blog.create(req.body)
        req.user.blogs.addToSet(blog)
        req.user.save()
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

const deleteBlog = async (req, res, next) =>  {
    try {
        const blog = await Blog.findOneAndDelete({_id : req.params.id,  user: req.user._id})
        req.user.blogs.pull(blog)
        req.user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

function jsonBlog (_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs (_, res) {
    res.json(res.locals.data.blogs)
}

module.exports = {
    indexBlogs,
    createBlog,
    showBlog,
    updateBlog,
    deleteBlog,
    jsonBlog,
    jsonBlogs
}