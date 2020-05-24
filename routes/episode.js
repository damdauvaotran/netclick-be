const express = require('express');

const router = express.Router();

const { validateUser } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');


/**
 * @swagger
 *
 * /video/episode/watch/{episodeId}:
 *  get:
 *    summary: get episode video
 *    description: Return video
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


router.get('/watch/:episodeId', validateUser, async (req, res) => {
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
 * /video/episode/{episodeId}:
 *  get:
 *    summary: get episode info
 *    description: Return episode info
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

router.get('/:episodeId', validateUser, async (req, res) => {
  const { episodeId } = req;
  const episodeInfo = await db.Episodes.findOne({
    where: {
      episodeId,
    },
  });
  if (episodeInfo) {
    buildRes(res, true, episodeInfo);
  }
  buildRes(res, false, 'Film not found');
});


module.exports = router;
