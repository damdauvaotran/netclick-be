const type = require('sequelize');

module.exports = (db, config) => db.define('actors',
  {
    actorId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    actorName: {
      type: type.STRING,
      allowNull: false,
    },
  },
  config);

/**
 * @swagger
 *
 * definitions:
 *  Actor:
 *    type: object
 *    properties:
 *      actorId:
 *        type: integer
 *      actorName:
 *        type: string
 */
