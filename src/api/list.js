const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../helper/middleware/auth');
const db = require('../models');
const { buildRes } = require('../helper/utils/response');

/**
 * @swagger
 *
 * /list:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: Get list array  by user
 *    description: Get the list user have
 *    tags:
 *      - list
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
 *              type: array
 *              items:
 *                  $ref: '#/definitions/List'
 */

router.get('/', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    console.log('hello');
    const filmList = await db.Lists.findAll({
      where: {
        userId,
      },
    });
    buildRes(res, true, filmList);
  } catch (err) {
    console.error(err);
    buildRes(res, false, err);
  }
});


module.exports = router;
