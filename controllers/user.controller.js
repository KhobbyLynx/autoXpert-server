import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

// @desc Check if user exists
// @route GET /api/checkUser
// @access Public
export const checkUserExists = asyncHandler(async (req, res) => {
  const { email } = req.query

  // Check if email is valid
  const isEmailValid = validateEmail(email)

  // Check if user with the given email already exists
  const userExists = await User.exists({ email })

  if (userExists) {
    res.json({ userExists: true })
  } else if (!isEmailValid) {
    res.json({ invalidEmail: true })
  } else {
    res.json({ userExists: false })
  }
})

// @desc Register new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user credentials')
  }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been Logged out.')
})

// Validate Email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' })
}
