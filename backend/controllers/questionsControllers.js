import validator from 'validator';

async function sendQuestion(req, res) {
  const { token } = req.headers;
  const { questionDomain, questionStack } = req.body;
  try {
    if (!token) {
      return res.status(500).json({ success: false, message: "Token Is Required" })
    }
  } catch (error) {

  }
};