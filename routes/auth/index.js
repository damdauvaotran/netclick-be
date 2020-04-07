const express = require('express');

const router = express.Router();

const loginRouter = require('./login');
const signUpRouter = require('./signUp');

router.use('/auth', loginRouter);
router.use('/auth', signUpRouter);

module.exports = router;
