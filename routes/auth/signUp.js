const express = require('express');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const { body, validationResult } = require('express-validator');
const { buildRes } = require('../../utils/response');
const { Users } = require('../../models');

const router = express.Router();

const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;
const saltLength = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 14;

/**
 * @swagger
 *
 * /auth/signup:
 *  post:
 *    summary: Sign up
 *    description: create account
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            token:
 *              type: String
 */

router.post('/signup', [body('username').isString(), body('password')], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return buildRes(res, false, 'Invalid input');
  }
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });
  if (user !== null) {
    return buildRes(res, false, 'User exist');
  }
  try {
    const salt = cryptoRandomString({ length: saltLength });
    const hashedPassword = await bcrypt.hash(password + salt, parseInt(saltRounds, 10));
    await Users.create({
      username,
      password: hashedPassword,
      salt,
    });
    return buildRes(res, true, {});
  } catch (e) {
    return buildRes(res, false, JSON.stringify(e));
  }
});


module.exports = router;
