const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value <0 ) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')){
        throw new Error('password cannot contain "password"')
      }
      if (value.length < 6){
        throw new Error('Password must be longer than 6 characters')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'signthatish')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email : email })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  return user
}

//Hash plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this

    if (user.isModified('password')) {
      try{
      user.password = await bcrypt.hash(user.password, 8)
      next()
    } catch (e){
    }
    return res.status(400).send()
  }
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
