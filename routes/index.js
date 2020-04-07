const express = require('express');

const router = express.Router();
const authRouter = require('./auth');

router.use('/auth', authRouter);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
