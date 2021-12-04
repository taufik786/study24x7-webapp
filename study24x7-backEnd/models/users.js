const mongoose = require('mongoose');

const mobileSchema = mongoose.Schema({
    mobile: { type: String },
    email: { type: String },
    name: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('user', mobileSchema);