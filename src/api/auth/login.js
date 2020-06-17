const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { buildRes } = require('../../helper/utils/response');
const { Users } = require('../../models');
const UserService = require('../../services/user_service');

const jwtPrivateKey = process.env.PRIVATE_KEY_JWT || '!bE8JX7!owd!W67&XEU9kw2W';

const router = express.Router();

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *    summary: Login
 *    description: Return token
 *    tags:
 *      - auth
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *          - username
 *          - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            token:
 *              type: string
 */

router.post(
  '/login',
  [body('username').isString(), body('password').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return buildRes(res, false, 'Invalid input');
    }

    const userDTO = req.body;
    try {
      const token = await UserService.login(userDTO);
      buildRes(res, true, { token });
    } catch (e) {
      buildRes(res, false, e.toString());
    }
  },
);

module.exports = router;
