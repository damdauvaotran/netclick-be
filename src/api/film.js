const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../helper/middleware/auth');
const db = require('../models');
const { buildRes } = require('../helper/utils/response');

/**
 * @swagger
 *
 * /film/{filmId}:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: get film by id
 *    description: Return film info
 *    tags:
 *      - film
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
      required: false,
      include: [
        {
          model: db.Progresses,
          where: {
            userId: id,
          },
          required: false,
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
 *    tags:
 *      - film
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name of the film
 *      - in: query
 *        name: year
 *        schema:
 *          type: int
 *        description: Year of the film
 *      - in: query
 *        name: starring
 *        schema:
 *          type: string
 *        description: Starring of the film
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
  try {
    const name = req.query.name || '';
    const starring = req.query.starring || '';
    console.log('film load: ', name);
    const filmList = await db.Films.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
        starring: {
          [Op.substring]: starring,
        },
      },
      include: [
        {
          model: db.Actors,
          required: false,
          through: { attributes: [] },
        },
        {
          model: db.Categories,
          required: false,
          through: { attributes: [] },
        },
      ],
    });
    if (filmList) {
      buildRes(res, true, filmList);
    } else {
      buildRes(res, false, 'Film not found');
    }
  } catch (error) {
    buildRes(res, false, error.toString());
  }
});


module.exports = router;
