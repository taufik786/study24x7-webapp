const mongoose = require('mongoose');

const mobileSchema = mongoose.Schema({
    mobile: { type: String, default: ''},
    email: { type: String, default: '' },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    otp: { type: String, },
    created: { type:String, default: Date() }
});

module.exports = mongoose.model('user', mobileSchema);