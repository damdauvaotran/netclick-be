const type = require('sequelize');

module.exports = (db, config) => db.define('progresses',
  {
    progressId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    currentTime: {
      type: type.INTEGER,
      allowNull: false,
    },
  }, config);

/**
 * @swagger
 *
 * definitions:
 *  Progress:
 *    type: object
 *    properties:
 *      progressId:
 *        type: integer
 *      time:
 *        type: integer
 */
