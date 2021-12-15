const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/createAccount', authController.createAccount);
router.post('/login', authController.login);


module.exports = router;