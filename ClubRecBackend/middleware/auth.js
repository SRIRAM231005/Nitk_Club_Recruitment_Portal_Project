const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        if(req.user.userRole != "Club Convener"){
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        next();
    });
}

module.exports = {
    authenticateToken
}