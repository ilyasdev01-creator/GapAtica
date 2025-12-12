import axios from "axios";
import dotenv from 'dotenv';
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

dotenv.config();

const frontEnd = process.env.FRONTEND_URL;

async function githubLogin(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) return res.status(400).send("No access token received");

    // Fetch GitHub user info
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { login, id, email, name } = userRes.data;
    const userEmail = email || `${login}@github.com`;


    let user = await User.findOne({ githubid: id });
    if (!user) {
      user = await User.create({
        name: name || login,
        email: userEmail,
        githubid: id,
      });
    }


    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.redirect(`${frontEnd}/explore?token=${token}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unknown error, please try again");
  }
}

export { githubLogin };
