import meeting from "../models/meetingsModel.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const bookMeeting = async (req, res) => {
  const { name, email, bookedTime } = req.body
  const { token } = req.headers
  try {
    if (!name || !email || !bookedTime) {
      return res.json({ success: false, message: "please provide all credintals" })
    }
    if (!token) {
      return res.json({ success: false, message: "please provide a token" })
    }
    const GOODTOKEN = jwt.verify(token, process.env.JWT_SECRET)

    if (!GOODTOKEN) {
      return res.json({ success: false, message: "please provide a valid token" })
    }
    await meeting.create({
      name,
      email,
      bookedTime
    });
    res.json({ success: true, message: "booked a meeting successfully" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unknown" })
  }
}


export { bookMeeting }