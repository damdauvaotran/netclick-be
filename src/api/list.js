const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../helper/middleware/auth');
const db = require('../models');
const { buildRes } = require('../helper/utils/response');
const ListService = require('../services/list_service');
const lists_model = require('../models/lists_model');

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

router.get('/list', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const filmList = await ListService.getListByUser(userId);
    return buildRes(res, true, filmList);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});


module.exports = router;
