const jwt = require('jsonwebtoken');
const { HASH_KEY_JWT } = process.env;

/**
 * Generates a JWT token for the given user.
 * @param {Object} user - A user object with a username.
 * @returns {String} A JWT token.
 */
const generateToken = (user) => {
    //set zone time
    const today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    // set expiration time for token 2 hours
    const expiresIn = new Date(today.setUTCHours(today.getUTCHours() + 2));
    const { username } = user;
    const charge = {
        data: {
            username,
        },
        expiresIn,
        iat: today.getTime()
    };
    let generateToken;
    try {
        generateToken = jwt.sign(charge, HASH_KEY_JWT);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    return generateToken;
}

module.exports = {
    generateToken
};