const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { buildRes } = require('../../utils/response');
const { Users } = require('../../models');

const jwtPrivateKey = process.env.PRIVATE_KEY_JWT || '!bE8JX7!owd!W67&XEU9kw2W';

const router = express.Router();

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    summary: Login
 *    description: Return token
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

router.post(
  '/login',
  [body('username').isString(), body('password').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return buildRes(res, false, 'Invalid input');
    }
    const { username, password } = req.body;
    const user = Users.findOne({
      where: { username },
    });
    if (user === null) {
      return buildRes(res, false, 'Invalid login info');
    }

    const encryptedTruePassword = user.password;
    const { salt } = user;
    const isPasswordCorrect = await bcrypt.compare(
      password + salt,
      encryptedTruePassword,
    );

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { username, id: user.userId, r: user.role },
        jwtPrivateKey,
        { expiresIn: 8640000 },
      ); // 100 days
      return buildRes(res, true, { token });
    }
    return buildRes(res, false, 'Invalid login info');
  },
);

module.exports = router;
