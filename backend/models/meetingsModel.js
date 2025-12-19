import mongoose, { mongo, MongooseError } from "mongoose";


const meetingSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  bookedTime: { type: String }
});

const meeting = mongoose.model("meeting", meetingSchema)


export default meeting