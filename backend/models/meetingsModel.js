import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  phone: {
    type: String
  },
  bookedTime: {
    type: String,
    required: [true, "Booked time is required"],
    unique: true // Prevent double booking
  },
  bookedDate: {
    type: Date,
    required: [true, "Booked date is required"]
  },
  meetingType: {
    type: String,
    enum: ["consultation", "demo", "support", "other"],
    default: "consultation"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // If you have a User model
    required: false
  },
  status: {
    type: String,
    enum: ["confirmed", "pending", "cancelled"],
    default: "confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

meetingSchema.index({ bookedTime: 1 }, { unique: true });
meetingSchema.index({ bookedDate: 1 });

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;