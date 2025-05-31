import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpiresAt: Date,
}, { timestamps: true });

const createUserModel = (conn) => conn.model('User', userSchema);

export default createUserModel;
