const express = require('express');

const router = express.Router();

const { createLogger } = require('winston');
const { validateUser, getTokenByRequest, getUserIdByToken } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');
const EpisodeService = require('../services/episode_service');

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
 *            token:
 *              type: string
 */


router.get('/episode/watch/:episodeId', async (req, res) => {
  try {
    const episodeId = parseInt(req.params.episodeId, 10);
    console.log(episodeId);
    const file = await EpisodeService.getEpFileById(episodeId);
    return res.download(file);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
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
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const { epId } = req.params;

    const episodeInfo = await EpisodeService.getEpByIdWithProgress(epId, userId);
    return buildRes(res, true, episodeInfo);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});


module.exports = router;
