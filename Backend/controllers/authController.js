import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    to: email,
    subject: 'Your OTP Code',
    html: `<h2>Your OTP is ${otp}</h2>`,
  });
};

// SIGNUP
export const signup = (User) => async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });

    // Generate OTP (you should email this)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    console.log(`OTP sent to ${email}: ${otp}`);

    res.status(200).json({ msg: 'Signup successful, OTP sent to email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during signup.' });
  }
};

// LOGIN
export const login = (User) => async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during login.' });
  }
};

// VERIFY OTP
export const verifyOtp = (User) => async (req, res) => {
  const { email, otp, otpFor } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (user.otp !== otp || Date.now() > user.otpExpiresAt) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({ msg: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error verifying OTP.' });
  }
};

// FORGOT PASSWORD (send OTP)
export const forgotPassword = (User) => async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log(`OTP for password reset: ${otp}`);

    res.status(200).json({ msg: 'OTP sent to your email for password reset.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error sending OTP.' });
  }
};

// RESET PASSWORD
export const resetPassword = (User) => async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ msg: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error resetting password.' });
  }
};