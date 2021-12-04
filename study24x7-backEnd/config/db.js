require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB, {
    useNewurlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.success('Mongodb Connected Successfully');
}).catch((err) => {
    console.error('Error in db connection', err);
});

module.exports = db;