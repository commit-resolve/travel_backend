const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-user-account', userController.createUserAccount);
router.post('/create-group', userController.createGroup);

module.exports = router;