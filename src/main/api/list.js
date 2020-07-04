const express = require('express');
const { Op, col } = require('sequelize');

const router = express.Router();
const { validateUser, getUserIdByToken, getTokenByRequest } = require('../middleware/auth');
const db = require('../models');
const { buildRes } = require('../utils/response');
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

/**
 * @swagger
 *
 * /list/favorite:
 *  get:
 *    security:
 *      - Bearer: []
 *    summary: Get favorite list of user
 *    description: Get the favorite list
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
 *              type: object
 *              properties:
 *                listId:
 *                  type: integer
 *                listName:
 *                  type: string
 *                favorite:
 *                  type: boolean
 *                userId:
 *                  type: integer
 *                films:
 *                  type: array
 *                  items:
 *                    $ref: '#/definitions/Film'
 */

router.get('/list/favorite', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const favoriteList = await ListService.getFavoriteListByUser(userId);
    return buildRes(res, true, favoriteList);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});

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

/**
 * @swagger
 *
 * /list/favorite/add:
 *  post:
 *    security:
 *      - Bearer: []
 *    summary: Add to film to favorite list of user
 *    description: Add film to favorite list of the owner of the token
 *    tags:
 *      - list
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - filmId
 *          properties:
 *            filmId:
 *              type: string
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
 *              properties:
 *                listId:
 *                  type: integer
 *                filmId:
 *                  type: integer
 */

router.post('/list/favorite/add', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const { filmId } = req.body;
    const filmList = await ListService.addToFavoriteList(filmId, userId);
    return buildRes(res, true, filmList);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});

/**
 * @swagger
 *
 * /list/favorite/remove:
 *  post:
 *    security:
 *      - Bearer: []
 *    summary: Remove film from favorite list of user
 *    description: Remove film from favorite list of the owner of the token
 *    tags:
 *      - list
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - filmId
 *          properties:
 *            filmId:
 *              type: string
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
 *              properties:
 *                listId:
 *                  type: integer
 *                filmId:
 *                  type: integer
 */

router.post('/list/favorite/remove', validateUser, async (req, res) => {
  try {
    const token = getTokenByRequest(req);
    const userId = await getUserIdByToken(token);
    const { filmId } = req.body;
    const filmList = await ListService.removeFromFavorite(filmId, userId);
    return buildRes(res, true, filmList);
  } catch (e) {
    return buildRes(res, false, e.toString());
  }
});
module.exports = router;
