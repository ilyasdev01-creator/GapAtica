import express from 'express';
import rl from '../middlewares/rateLimitMiddlware.js';
import {
  bookMeeting,
  deleteMeeting,
  getAllBookedTimes
} from '../controllers/meeting.js';

const meetingRoute = express.Router();


meetingRoute.post('/bookMeeting', rl, bookMeeting);
meetingRoute.get('/getBookedTimes', getAllBookedTimes);
meetingRoute.delete('/deleteMeeting', deleteMeeting);

export default meetingRoute;