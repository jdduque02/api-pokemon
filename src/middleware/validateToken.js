const jwt = require('jsonwebtoken');
const { HASH_KEY_JWT } = process.env;
const { response } = require('express');

/**
 * Verifies that a token is valid and exists in the request headers.
 * If the token is invalid or not found, an error response is sent.
 * If the token is valid, the request continues to the next middleware.
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express middleware function.
 */
const verifyToken = (req, res = response, next) => {
    const { headers } = req;
    const token = headers['x-access-token'];
    if (!token) return res.status(400).send('token not  found');
    let validateToken;
    try {
        validateToken = jwt.verify(token, HASH_KEY_JWT);
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'invalid token' });
    }
    req.token = validateToken.data;
    next();
};

module.exports = { verifyToken };