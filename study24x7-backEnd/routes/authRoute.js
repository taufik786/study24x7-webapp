const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/verifyOtp/:mobile', authController.verifyOtp);
router.post('/createAccount', authController.createAccount);


module.exports = router;