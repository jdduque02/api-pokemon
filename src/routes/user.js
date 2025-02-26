
const express = require('express');
const { create, login } = require('../controllers/user/controller');
const router = express.Router();

router.post('/user/', create);

router.post('/user/login', login);

module.exports = router;