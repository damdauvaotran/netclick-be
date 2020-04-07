const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4 } = require('uuid');
const { buildRes } = require('../utils/response');

const router = express.Router();

const todoList = [];
/**
 * @swagger
 *
 * /todo:
 *  get:
 *    summary: Get todo list
 *    description: Return a list of todo
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            todoList:
 *              type: array
 *              items:
 *                $ref: '#definitions/TodoItem'
 */
router.get('/', (req, res) => {
  buildRes(res, true, { todoList });
});

/**
 * @swagger
 *
 * /todo:
 *  post:
 *    description: Create new todo item
 *    summary: Create a new todo item
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: OK
 *        schema:
 *          type: object
 *          properties:
 *            todoList:
 *              type: array
 *              items:
 *                $ref: '#definitions/TodoItem'
 */
router.post(
  '/',
  [body('content').isString(), body('isDone').isBoolean()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return buildRes(res, false, 'Invalid Input');
    } console.log(errors);
    const id = v4();
    const { content, isDone } = req.body;
    todoList.push({
      id,
      content,
      isDone,
    });
    console.log(todoList);
    return buildRes(res, true, { todoList });
  },
);

module.exports = router;
