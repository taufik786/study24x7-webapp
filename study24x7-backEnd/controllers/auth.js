require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    let { name, email, phone, password } = req.body;
    let isEmail = await User.findOne({ email: req.body.email });
    let isPhone = await User.findOne({ phone: req.body.phone });

    if (name == "" || email == "" || phone == "" || password == "") {
      return res.status(404).json({
        message: "Please Fill All Fields",
      });
    } else if (isEmail) {
      return res.status(403).json({
        message: "Email Already Exists.",
      });
    } else if (isPhone) {
      return res.status(403).json({
        message: "Mobile Number Already Exists.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hashedPass) => {
        if (err) throw err;
        const user = new User({
          name: name,
          email: email,
          phone: phone,
          password: hashedPass,
          isAdmin: false,
          created: new Date(),
        });
        user.save().then((result) => {
          const token = jwt.sign({ data: result }, process.env.JWTSECRET, {
            expiresIn: "10d",
          });
          res.status(200).json({
            success: true,
            message: "Account Created Successfully.",
            USER_DATA: result,
            token: token,
            expiresIn: 10*24*60*60,
          });
        });
      });
    }
  },

  async login(req, res) {
    let { username, password } = req.body;
    let regex = /^([0-9]){3,10}$/;
    let loginCreds = "";

    if (username == "" || password == "") {
      return res.status(403).json({ message: "Empty Fields Not Allowed." });
    }

    if (regex.test(username)) {
      loginCreds = { phone: req.body.username };
    } else {
      loginCreds = { email: req.body.username };
    }

    User.findOne(loginCreds)
      .then((user) => {
        return bcrypt.compare(
          req.body.password,
          user.password,
          (err, passMatch) => {
            if (err) {
              return res.status(403).json({
                message: "Password Hashing Error",
                err,
              });
            } else if (!passMatch) {
              return res.status(402).json({
                message: "Password Does Not Match.",
                success: false,
              });
            } else {
              const token = jwt.sign({ data: user }, process.env.JWTSECRET, {
                expiresIn: "10d",
              });

              res.status(200).json({
                success: true,
                message: "Login Successfully Completed.",
                USER_DATA: user,
                token: token,
                expiresIn: 10*24*60*60,
              });
            }
          }
        );
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Invalid Credentials",
          err,
        });
      });
  },
};
