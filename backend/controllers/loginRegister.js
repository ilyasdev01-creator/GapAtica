import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide full credentials" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email" });
    }

    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minNumbers: 1,
      minUppercase: 0,
      minSymbols: 0
    })) {
      return res.status(400).json({ success: false, message: "Please provide a stronger password" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const payload = { userId: newUser._id, userName: newUser.name, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ success: true, message: 'User created successfully', token });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Unknown error, please try again!" });
  }
}

export { register };
