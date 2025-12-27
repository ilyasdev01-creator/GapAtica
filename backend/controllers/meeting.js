// controllers/meetingsController.js
import Meeting from "../models/meetingsModel.js";
import jwt from 'jsonwebtoken';
import { format, isPast, addHours } from 'date-fns';

// Helper function to verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Book a meeting
export const bookMeeting = async (req, res) => {
  try {
    const { slot, date, userDetails, meetingType = "consultation" } = req.body;
    const { token } = req.headers;

    // Validation
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please provide a token"
      });
    }

    // Verify token
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Check if required fields are provided
    if (!slot || !date || !userDetails) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: slot, date, and userDetails"
      });
    }

    const { name, email, phone } = userDetails;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name"
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Check if slot is already booked
    const existingMeeting = await Meeting.findOne({ bookedTime: slot });
    if (existingMeeting) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked"
      });
    }

    // Check if the slot is in the past
    const meetingDate = new Date(date);
    if (isPast(meetingDate)) {
      return res.status(400).json({
        success: false,
        message: "Cannot book a meeting in the past"
      });
    }

    // Create new meeting
    const newMeeting = await Meeting.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      bookedTime: slot,
      bookedDate: meetingDate,
      meetingType,
      userId: decodedToken.userId || null,
      userDetails: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined
      }
    });

    res.status(201).json({
      success: true,
      message: "Meeting booked successfully",
      meeting: {
        id: newMeeting._id,
        bookedTime: newMeeting.bookedTime,
        bookedDate: newMeeting.bookedDate,
        meetingType: newMeeting.meetingType,
        userDetails: newMeeting.userDetails
      }
    });

  } catch (error) {
    console.error("Booking error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked"
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};

// Get all booked times
export const getAllBookedTimes = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please provide a token"
      });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Get all meetings
    const meetings = await Meeting.find({})
      .select("bookedTime bookedDate meetingType userDetails status -_id")
      .sort({ bookedDate: 1 });

    // Transform data for frontend
    const meetingData = meetings.map(meeting => ({
      id: meeting._id,
      bookedTime: meeting.bookedTime,
      bookedDate: meeting.bookedDate,
      meetingType: meeting.meetingType,
      userDetails: meeting.userDetails,
      status: meeting.status
    }));

    res.status(200).json({
      success: true,
      meetingData
    });

  } catch (error) {
    console.error("Get booked times error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};

// Delete a meeting
export const deleteMeeting = async (req, res) => {
  try {
    const { meetingId, slotString } = req.body;
    const { token } = req.headers;

    // Validation
    if (!meetingId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a meeting ID"
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please provide a token"
      });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Find the meeting
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    // Optional: Check if user owns the meeting (if you have user auth)
    // if (meeting.userId && meeting.userId.toString() !== decodedToken.userId) {
    //   return res.status(403).json({ 
    //     success: false, 
    //     message: "You are not authorized to cancel this meeting" 
    //   });
    // }

    // Check if meeting is in the past (optional restriction)
    const meetingEndTime = addHours(meeting.bookedDate, 1);
    if (isPast(meetingEndTime)) {
      await Meeting.findByIdAndDelete(meetingId);
      return res.status(200).json({
        success: true,
        message: "Past meeting deleted successfully"
      });
    }

    // For future meetings, allow cancellation
    await Meeting.findByIdAndDelete(meetingId);

    res.status(200).json({
      success: true,
      message: "Meeting cancelled successfully"
    });

  } catch (error) {
    console.error("Delete meeting error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid meeting ID format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};

// Get meeting by ID (optional)
export const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please provide a token"
      });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    res.status(200).json({
      success: true,
      meeting
    });

  } catch (error) {
    console.error("Get meeting error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};