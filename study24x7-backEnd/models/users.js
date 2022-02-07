const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: ''},
    password: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
    created: { type:String, default: Date() },
});

module.exports = mongoose.model('user', userSchema);