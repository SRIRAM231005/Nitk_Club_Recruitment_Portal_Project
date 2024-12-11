const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded; // Save the decoded user info
        next();
    });
}

module.exports = {
    authenticateToken
}