import rateLimit from 'express-rate-limit';

const rl = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many attempts try again later"
  }
});

export default rl;