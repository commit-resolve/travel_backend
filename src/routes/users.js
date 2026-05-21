const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create-user-account', userController.createUserAccount);

module.exports = router;