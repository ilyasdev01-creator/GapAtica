import express from 'express';
import { register, login } from '../controllers/loginRegister.js';
import rl from '../middlewares/rateLimitMiddlware.js';

const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.post('/login', rl, login)
export default userRoute;