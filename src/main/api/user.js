const express = require('express');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');
const UserService = require('../services/user_service');

/**
 * @swagger
 *
 * /user:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: Get user info
 *    description: Return user info
 *    tags:
 *      - user
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            data:
 *              type: object
 *              $ref: '#/definitions/User'
 */

router.get('/user', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const userInfo = await UserService.getUserInfo(userId);
    return buildRes(res, true, userInfo);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});

module.exports = router;
