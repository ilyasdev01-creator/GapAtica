import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(200).json({ success: false, message: "please provide full credintals" })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please provide an email" });
    };

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unkown error please try again!" })
  }
}

export { register };