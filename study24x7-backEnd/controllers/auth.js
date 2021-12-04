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
            jwt.sign({data: result}, process.env.JWTSECRET, { expiresIn: '5h' }, (err, token) => {
              if(err) throw err;
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
            jwt.sign({data: result}, process.env.JWTSECRET, { expiresIn: '5h' }, (err, token) => {
              if(err) throw err;
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
  // register(req, res) {
  //   const mobile = req.body.mobile;
  //   if( mobile != '') {
  //     let otp = 1522;
  //     if(req.body.otp = otp) {
  //       const user =new User({
  //         mobile: mobile,
  //         email: req.body.email,
  //         name: req.body.name,
  //         otp: req.body.otp,
  //         password: req.body.password
  //       });
  //       user.save().then(result => {
  //         res.send('work')
  //         console.log(result,'sss')
  //         // return res.status(201).json({message: 'Account Created Successfully', result})
  //       }).catch(err => {
  //         res.send('not wrk')
  //         // return res.status(403).json({message:' Account Not Created.', err})
  //       })
  //     }
  //     res.send('not otp')
  //   } else {
  //     res.send('nnnn')
  //   }
  // },

  async verifyOtp(req, res, obj) {
    // console.log(req.body.mobile);
    console.log(req.params);
    // console.log(req.body.otp.otp);
    const mobile = await User.findOne({mobile: req.params.mobile});
    if(mobile) {
      res.send('works')
      console.log('wwww');
    } else {
      res.send('nooo')
      console.log('xxxx');
    }
    // if (req.body.otp == 1522) {
    //   return res.status(200).json({ message: "OTP verified successfully" });
    // } else {
    //   return res.status(500).json({ message: "OTP not verified" });
    // }
  },
  
  createAccount(req, res) {
    let { name, email, password } = req.body;
    
    bcrypt.hash(password, 10, (err, hashPass) => {
      if (err) throw (err, "Error in hashing");

      const user = new User({
        name: name,
        email: email,
        password: hashPass,
      });

      user
        .save()
        .then((result) => {
          jwt.sign({ data: result }, process.env.JWTSECRET, {
            expiresIn: "1h",
          }, (err, token) => {
            if(err) throw err;
            return res
              .status(201)
              .json({ message: "Account created successfully", result, token });
          });
        })
        .catch((err) => {
          return res.status(403).json({ message: "Account not created", err });
        });
    });
  },
};
