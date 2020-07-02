const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');
const ProgressService = require('../services/progress_service');

/**
 * @swagger
 *
 * /progress/save:
 *  post:
 *    security:
 *      - Bearer: []
 *    summary: Save progress of episode
 *    description: Return progress
 *    tags:
 *      - progress
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *          - epId
 *          - progress
 *          properties:
 *            epId:
 *              type: integer
 *            progress:
 *              type: integer
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
 */

router.post('/progress/save', validateUser, async (req, res) => {
  const { epId, progress } = req.body;
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const savedProgress = await ProgressService.saveProgress(epId, userId, progress);
    return buildRes(res, true, savedProgress);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});

module.exports = router;
