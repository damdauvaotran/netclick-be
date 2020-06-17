const express = require('express');

const router = express.Router();

const loginRouter = require('./login');
const signUpRouter = require('./signUp');

router.use('/', loginRouter);
router.use('/', signUpRouter);

module.exports = router;
