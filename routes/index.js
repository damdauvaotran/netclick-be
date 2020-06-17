const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const episodeRouter = require('./episode');
const filmRouter = require('./film');
const progressRouter = require('./progress');
const listRouter = require('./list');

router.use('/auth', authRouter);
router.use('/episode', episodeRouter);
router.use('/film', filmRouter);
router.use('/progress', progressRouter);
router.use('/list', listRouter);


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
