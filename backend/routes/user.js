// Installing Dependencies

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Routing Endpoints

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exporting Routes

module.exports = router;