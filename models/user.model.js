import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
