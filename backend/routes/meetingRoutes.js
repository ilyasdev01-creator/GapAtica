import express from 'express';
import rl from '../middlewares/rateLimitMiddlware.js'
import { bookMeeting, deleteMeeting, getAllBookedTimes } from '../controllers/meeting.js';


const meetingRoute = express.Router();


meetingRoute.post('/meetings/bookmeeting', rl, bookMeeting)
meetingRoute.get('/meetings/getBookedTimes', getAllBookedTimes)
meetingRoute.post('/meetings/deleteMeeting', deleteMeeting)


export default meetingRoute