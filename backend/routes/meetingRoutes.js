import express from 'express';
import rl from '../middlewares/rateLimitMiddlware.js'
import { bookMeeting } from '../controllers/meeting.js';


const meetingRoute = express.Router();


meetingRoute.post('/bookmeeting', rl, bookMeeting)



export default meetingRoute