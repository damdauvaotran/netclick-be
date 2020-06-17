const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../helper/middleware/auth');
const db = require('../models');
const { buildRes } = require('../helper/utils/response');

/**
 * @swagger
 *
 * /progress/save:
 *  post:
 *    security:
 *      - Bearer: []
 *    summary: get all film
 *    description: Return film list
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
    const currentProgress = await db.Progresses.findOne({
      where: {
        userId,
        epId,
      },
    });

    if (currentProgress !== null) {
      await db.Progresses.update({ currentTime: progress }, {
        where: {
          userId,
          epId,
        },
      });
    } else {
      await db.Progresses.create({
        userId,
        epId,
        currentTime: progress,
      });
    }
    buildRes(res, true, {});
  } catch (err) {
    buildRes(res, false, err);
  }
});

module.exports = router;
