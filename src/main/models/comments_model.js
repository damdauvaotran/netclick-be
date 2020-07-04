const type = require('sequelize');

module.exports = (db, config) => db.define('comments',
  {
    commentId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
      type: type.STRING,
      allowNull: false,
    },
  },
  config);

/**
 * @swagger
 *
 * definitions:
 *  Comment:
 *    type: object
 *    properties:
 *      commentId:
 *        type: integer
 *      comment:
 *        type: string
 */
