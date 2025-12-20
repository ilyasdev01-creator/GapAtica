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
    res.json({ success: false, message: "Unknown error please try again" })
  }
}


const getAllBookedTimes = async (req, res) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return res.json({ success: false, message: "please provide a token" })
    }
    const GOODTOKEN = jwt.verify(token, process.env.JWT_SECRET);

    if (!GOODTOKEN) {
      return res.json({ success: false, messsage: "please provide a valid token" })
    }
    const meetingData = await meeting.find({}).select("bookedTime -_id");
    res.json({ success: true, meetingData })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unknown error please try again" })
  }
}

const deleteMeeting = async (req, res) => {
  const { Stringdate, DbDate } = req.body;
  const { token } = req.headers;

  try {
    if (!Stringdate || !DbDate) {
      return res.json({ success: false, message: "please provide a date" })
    }
    if (!token) {
      return res.json({ success: false, message: "please provide a token" })
    }

    const GOODTOKEN = jwt.verify(token, process.env.JWT_SECRET);
    if (!GOODTOKEN) {
      return res.json({ success: false, message: "please provide a valid token" })
    }

    const bookedDate = new Date(Stringdate);
    const endTime = new Date(bookedDate.getTime() + 60 * 60 * 1000); // add 1 hour

    if (new Date() > endTime) {
      await meeting.deleteOne({ bookedTime: DbDate });
      res.json({ success: true, message: "meeting deleted successfully" })
    } else {
      res.json({ success: false, message: "meeting is not yet over" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unknown error please try again" })
  }
}

export { bookMeeting, getAllBookedTimes, deleteMeeting }