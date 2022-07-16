const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
  
    //console.log(req.body);
    //get email and the password from the frontend
    //whenever have a post request u get all the data through the req.body
    //create the user but first hash the pwd
    console.log(req.body);

    try {
      // http://localhost:5000/user/register
      const { name, email, password} =
        req.body;
      
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email" });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);
      
       
        const newUser = new Users({ name, email, password });
        await newUser.save();
        res.json({ msg: "Account has been activated!" });
      
      console.log(newUser)
      

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
 
  login: async (req, res) => {
    try {
      //http://localhost:5000/user/login
      console.log(req.body)
      const { email, password } = req.body;
      const existingUser = await Users.findOne({
        email: { $regex: email, $options: "i" },
      });
      if (!existingUser)
        return res.status(400).json({ msg: "That Email doesn't exist." });
      const isPasswordCorrect = password
      if (!isPasswordCorrect)
        return res.status(400).json({ msg: "Invalid credentials" });

      // http://localhost:5000/user/refresh_token
      const refresh_token = createRefreshToken({ id: existingUser._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json({ /*result : existingUser,*/ msg: "Login success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      //http://localhost:5000/user/refresh_token
      //get theCookie value
      const rf_token = req.cookies.refreshtoken;
      //console.log(rf_token)
      if (!rf_token) return res.status(500).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(500).json({ msg: "Please login now!" });
        // console.log(user);
        // if user login in create a token to stay loged in
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  // getUserInfor: async (req, res) => {
  //   try {
  //     const user = await Users.findById(req.user.id).select("-password");
  //     console.log(user);
  //     res.json(user);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  // getUsersAllInfor: async (req, res) => {
  //   try {
  //     const user = await Users.find().select("-password");
  //     res.json(user);
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


const createAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "365d",
  });
};
module.exports = userCtrl;