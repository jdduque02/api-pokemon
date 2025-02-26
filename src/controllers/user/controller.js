const { readDB, writeDB } = require('./../../config/database');
const { generateToken } = require('./../../helper/generateToken');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { HASH_KEY_USER } = process.env;
const DBTABLE = 'users';
/**
 * Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with message, user, and token
 * @description This function creates a new user and saves it to the database. If the user already exists, it returns a 400 status code with a message. If there is an error, it returns a 500 status code with a message. Otherwise, it returns a 201 status code with a message, user, and token.
 */
const create = (req, res = response) => {
    const { body } = req;
    if (!body.username || !body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const { username, password } = body;

    let users;
    try {
        users = readDB(DBTABLE);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    let validateExitingUser;
    if (Object.keys(users).length !== 0) {

        try {
            validateExitingUser = validateExitingUser = users.find(user => user.username === username);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
        if (validateExitingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    }
    const newUser = {
        id: uuidv4(),
        username,
        password
    }

    let salt;
    try {
        salt = bcrypt.genSaltSync(15);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    let hash;
    try {
        hash = bcrypt.hashSync(newUser.password, salt, 15, HASH_KEY_USER);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    newUser.password = hash;

    let saveUserDB;
    try {
        saveUserDB = users.push(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    let token;
    try {
        token = generateToken(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    let sendUserDB;
    try {
        sendUserDB = writeDB(users, DBTABLE);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    delete newUser.password;
    res.status(201).json({ message: 'User created successfully', user: newUser, token });
}

/**
 * Authenticates a user by verifying the provided username and password.
 * 
 * @param {Object} req - HTTP request object containing the username and password in the body.
 * @param {Object} res - HTTP response object used to return the authentication result and token.
 * 
 * @returns {Object} - Returns a JSON response with the authentication status and JWT token if successful.
 * 
 * @throws {Error} - Throws an error if there is an issue reading the database, finding the user, or generating the token.
 */

const login = (req, res = response) => {
    const { body } = req;
    if (!body.username || !body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const { username, password } = body;
    let users;
    try {
        users = readDB(DBTABLE);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    let user;
    try {
        user = users.find(user => user.username === username);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Password incorrect' });
    }
    let token;
    try {
        token = generateToken(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: 'Login successful', token });
}
module.exports = { create, login };