require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    var { mobile, email } = req.body;
    var otp = 1522;

    if (mobile && !email) {
      let exitMobile = await User.findOne({ mobile });
      if (exitMobile) {
        return res.status(403).json({ message: "Mobile Already exist mobile", otp });
      } else {
        let user = new User({
          mobile: mobile,
        });
        user.save().then((result) => {
          jwt.sign({ data: result }, process.env.JWTSECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            return res
              .status(201)
              .json({ message: "OTP Send To Mobile Number", result, token });
          });
        }).catch((err) => {
          return res.status(500).json({ message: "Invalid Number", err });
        });
      }
    } else if (email && !mobile) {
      let existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(403).json({ message: "Email Already Exists", otp });
      } else {
        let user = new User({
          email: email,
        });
        user
          .save()
          .then((result) => {
            jwt.sign({ data: result }, process.env.JWTSECRET, { expiresIn: '5h' }, (err, token) => {
              if (err) throw err;
              return res
                .status(201)
                .json({ message: "OTP Send To Email Address", result, token });
            });
          })
          .catch((err) => {
            return res.status(500).json({ message: "Invalid Email" });
          });
      }
    } else {
      return res
        .status(415)
        .json({ message: "Select Only One Email or Mobile ||| more error" });
    }
  },

  verifyOtp(req, res) {
    if (req.body.otp == 1522) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(500).json({ message: "Invalid OTP!" });
    }
  },

  createAccount(req, res) {
    let { name, email, password, mobile } = req.body;
    // console.log(req.body)
    if(req.body.mn) {
      bcrypt.hash(password, 10, (err, hashPass) => {
        if (err) throw (err, "Error in hashing");
        const userDetails = {
          name: name,
          email: email,
          password: hashPass,
        };
        User.findOneAndUpdate({ mobile: req.body.mn }, { $set: userDetails }, { new: true })
          .then((result) => {
            // console.log(result)
            jwt.sign({ data: result }, process.env.JWTSECRET, {
              expiresIn: "1h",
            }, (err, token) => {
              if (err) throw err;
              return res
                .status(201)
                .json({ message: "Account created successfully", result, token });
            });
          })
          .catch((err) => {
            return res.status(403).json({ message: "Account not created", err });
          });
      })

    } else if(req.body.emId) {
      bcrypt.hash(password, 10, (err, hashPass) => {
        if (err) throw (err, "Error in hashing");
        const userDetails = {
          name: name,
          mobile: mobile,
          password: hashPass,
        };
        User.findOneAndUpdate({ email: req.body.emId }, { $set: userDetails }, { new: true })
          .then((result) => {
            jwt.sign({ data: result }, process.env.JWTSECRET, {
              expiresIn: "1h",
            }, (err, token) => {
              if (err) throw err;
              return res
                .status(201)
                .json({ message: "Account created successfully", result, token });
            });
          })
          .catch((err) => {
            return res.status(403).json({ message: "Account not created", err });
          });
      })
    } else {
      console.log('not creted')
    }
  },

  login(req, res){
    let { email, mobile } = req.body;
    if(email && !mobile) {
      User.findOne({email: req.body.email}).then(user => {
        // console.log(user)
        return bcrypt.compare(req.body.password, user.password, (err, passMatch) => {
          if(err){
            return res.status(402).json({message: 'Password Hashing error', err})
          } else if(!passMatch) {
            return res.status(401).json({message: 'Password Does not match'})
          } else {
            const token = jwt.sign({ data: user }, process.env.JWTSECRET, { expiresIn: "1h" });
            return res.status(200).json({
              message: 'Login successfully', user,
              token: token,
              expiresIn: 3600
            });
          }
        })
      }).catch(err => {
        return res.status(403).json({message: 'Email id wrong', err});
      })
    } else if(mobile && !email) {
      User.findOne({mobile: req.body.mobile}).then(user => {
        return bcrypt.compare(req.body.password, user.password, (err, passMatch) => {
          if(err) {
            return res.status(403).json({message: 'Error in decripting', err});
          } else if(!passMatch) {
            return res.status(401).json({message: 'Password wrorng'});
          } else {
            const token = jwt.sign({mobile: user.mobile}, process.env.JWTSECRET, {expiresIn: '1h'})
                return res.status(200).json({
                  message: 'Login successfully',
                  user: user,
                  token: token,
                  expiresIn: 3600
              })
              }
            })
      }).catch(err => {
        return res.status(403).json({message: 'Invalid Mobile', err});
      })

    } else {
      return res.status(403).json({message: 'Can not login with both id'});
    }
  }
};
