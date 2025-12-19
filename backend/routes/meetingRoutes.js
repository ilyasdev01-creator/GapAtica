import express from 'express';
import rl from '../middlewares/rateLimitMiddlware.js'
import { bookMeeting, getAllBookedTimes } from '../controllers/meeting.js';


const meetingRoute = express.Router();


meetingRoute.post('/meetings/bookmeeting', rl, bookMeeting)
meetingRoute.get('/meetings/getBookedTimes', getAllBookedTimes)



export default meetingRoute