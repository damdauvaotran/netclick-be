const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const episodeRouter = require('./episode');
const filmRouter = require('./film');

router.use('/auth', authRouter);
router.use('/episode', episodeRouter);
router.use('/film', filmRouter);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
