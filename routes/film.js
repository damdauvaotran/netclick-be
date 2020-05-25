const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');

/**
 * @swagger
 *
 * /film/{filmId}:
 *  get:
 *    security:
 *      - Bearer: []
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

router.get('/:filmId', async (req, res) => {
  const { filmId } = req.params;
  const token = getTokenByRequest(req);
  const id = await getUserIdByToken(token);
  const filmInfo = await db.Films.findOne({
    where: {
      filmId,
    },
    include: [{
      model: db.Episodes,
      // where: { filmId: col('films.film_id') },
      include: [
        {
          model: db.Progress,
          where: {
            userId: id,
          },
        },
      ],
    }],
  });
  if (filmId) {
    buildRes(res, true, filmInfo);
  } else {
    buildRes(res, false, 'Film not found');
  }
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
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name of the film
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
  const name = req.params.name || '';
  console.log('film load');
  const filmList = await db.Films.findAll({
    where: {
      name: {
        [Op.substring]: name,
      },
    },
  });
  if (filmList) {
    buildRes(res, true, filmList);
  } else {
    buildRes(res, false, 'Film not found');
  }
});


module.exports = router;
