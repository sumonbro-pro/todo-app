const jwt = require('jsonwebtoken');
const secretKey = require('../config/config').jwt_secret_key;
module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const email = jwt.verify(token, secretKey);
        if(email) {
            req.headers.token = email;
            next();
        }
    } catch(err) {
        res.status(403).json({status: 'error', message: err});
    }
}