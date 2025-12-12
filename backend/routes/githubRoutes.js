import express from 'express';
import rl from '../middlewares/rateLimitMiddlware.js';
import { githubLogin } from '../controllers/githubLogin.js';


const githubRoute = express.Router();


githubRoute.get('/auth/github/callback', rl, githubLogin)

export default githubRoute