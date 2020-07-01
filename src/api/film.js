const express = require('express');

const { validateUser, getUserIdByToken, getTokenByRequest } = require('../middleware/auth');
const { buildRes } = require('../utils/response');
const FilmService = require('../services/film_service');

const router = express.Router();

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

router.get('/film/:filmId', async (req, res) => {
  try {
    const { filmId } = req.params;
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);

    const filmInfo = await FilmService.getFilmByIdWithProgress(filmId, userId);
    return buildRes(res, true, filmInfo);
  } catch (e) {
    return buildRes(res, false, e.toString());
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
 *        name: category
 *        schema:
 *          type: string
 *        description: category
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

router.get('/film', validateUser, async (req, res) => {
  try {
    const { query } = req;
    const filmList = await FilmService.searchFilmByQuery(query);
    return buildRes(res, true, filmList);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});

module.exports = router;
