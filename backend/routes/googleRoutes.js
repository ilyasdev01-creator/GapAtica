import express from 'express';
import { googleRegister } from '../controllers/googleLogin.js';
import rl from '../middlewares/rateLimitMiddlware.js';

const googleRoute = express.Router();

googleRoute.post("/registerGoogle", rl, googleRegister)

export default googleRoute;