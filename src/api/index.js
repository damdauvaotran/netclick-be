const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const episodeRouter = require('./episode');
const filmRouter = require('./film');
const progressRouter = require('./progress');
const listRouter = require('./list');
const userRouter = require('./user');

router.use('/', authRouter);
router.use('/', episodeRouter);
router.use('/', filmRouter);
router.use('/', progressRouter);
router.use('/', listRouter);
router.use('/', userRouter);


// GET home page.
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
