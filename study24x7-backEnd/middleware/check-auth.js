require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        req.user = decodedToken.data;
        next();
    } catch (error) {
        res.status(401).json({message: "You are not authenticated"});
    }
}