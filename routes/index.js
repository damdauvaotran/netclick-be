const express = require('express');

const router = express.Router();
const todoRouter = require('./todo');

router.use('/todo', todoRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
