const express = require('express');

const router = express.Router();
const { validateUser } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');

/**
 * @swagger
 *
 * /film/{filmId}:
 *  get:
 *    summary: get film by id
 *    description: Return film info
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: filmId
 *        schema:
 *          type: integer
 *        required: true
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            data:
 *              $ref: '#/definitions/Film'
 */

router.get('/:filmId', validateUser, async (req, res) => {
  const { filmId } = req;
  const filmInfo = await db.Films.findOne({
    where: {
      filmId,
    },
  });
  if (filmId) {
    buildRes(res, true, filmInfo);
  }
  buildRes(res, false, 'Film not found');
});

/**
 * @swagger
 *
 * /film:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: get all film
 *    description: Return film list
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
 *              $ref: '#/definitions/Film'
 */

router.get('/', validateUser, async (req, res) => {
  console.log('film load');
  const filmList = await db.Films.findAll({
  });
  if (filmList) {
    buildRes(res, true, filmList);
  } else {
    buildRes(res, false, 'Film not found');
  }
});


module.exports = router;
