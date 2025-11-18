// backend/models/User.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Use bcryptjs as it's pure JS

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Patient', 'Doctor', 'Admin'], // Use capitalized roles to match the frontend
    required: true,
  },
  // Doctor-specific fields (optional)
  specialization: { type: String },
  availability: [String],
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;