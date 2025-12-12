import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const googleRegister = async (req, res) => {
  const { accessToken } = req.body;
  try {
    if (!accessToken) {
      return res.json({ success: false, message: "please provide credentials" })
    }

    const googleRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await googleRes.json();
    const email = googleUser.email
    if (!email) {
      return res.json({ success: false, message: "invalid token" });
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      const token = jwt.sign(
        { id: userExists._id, email: userExists.email, name: userExists.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return res.json({ success: true, message: "Logged in", token });
    }

    const newUser = await User.create({
      name: googleUser.name,
      email: email,
      googleid: googleUser.id
    });

    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({ success: true, message: "User created", token })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unknown error please try again" })
  }
}

export { googleRegister }