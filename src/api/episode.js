const express = require('express');

const router = express.Router();

const { validateUser, getTokenByRequest, getUserIdByToken } = require('../helper/middleware/auth');
const db = require('../models');
const { buildRes } = require('../helper/utils/response');


/**
 * @swagger
 *
 * /episode/watch/{episodeId}:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: get episode video
 *    description: Return video
 *    tags:
 *      - episode
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
 *            token:
 *              type: string
 */


router.get('/episode/watch/:episodeId', validateUser, async (req, res) => {
  const { episodeId } = req;
  const episode = await db.Episodes.findOne({
    where: {
      episodeId,
    },
  });
  if (episode) {
    const { uri } = episode;
    const file = `./resources/movies/${uri}.mp4`;
    return res.download(file);
  }
  buildRes(res, false, 'Ep not found');
});

/**
 * @swagger
 *
 * /episode/{episodeId}:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: get episode info
 *    description: Return episode info
 *    tags:
 *      - episode
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: episodeId
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
 *              $ref: '#/definitions/Episode'
 */

router.get('/episode/:epId', validateUser, async (req, res) => {
  const token = getTokenByRequest(req);
  const userId = await getUserIdByToken(token);
  const { epId } = req.params;
  const episodeInfo = await db.Episodes.findOne({
    where: {
      epId,
    },
    include: [
      {
        model: db.Progresses,
        where: {
          userId,
        },
        required: false,
      },
    ],
  });
  if (episodeInfo) {
    return buildRes(res, true, episodeInfo);
  }
  return buildRes(res, false, 'Film not found');
});


module.exports = router;