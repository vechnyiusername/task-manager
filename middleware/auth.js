const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

exports.verifyToken = async (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.validateRegister = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

exports.validateLogin = [
    check('username', 'Please include a valid username').exists(),
    check('password', 'Password is required').exists()
];