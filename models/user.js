require('dotenv') = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { model, Schema } = require('mongoose')


const userSchema = new Schema ({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign ({ _id: this._id}, process.env.SECRET)
    return token
}

const User = model('User',  userSchema)

module.exports = User