const type = require('sequelize');

module.exports = (db, config) => db.define('episodes',
  {
    epId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: type.TEXT,
      allowNull: true,
    },
    duration: {
      type: type.INTEGER,
      allowNull: true,
      default: 0,
    },
    description: {
      type: type.TEXT,
      allowNull: true,
    },
    uri: {
      type: type.TEXT,
      allowNull: false,
    },
    epNum: {
      type: type.INTEGER,
      allowNull: false,
    },
  },
  config);

/**
 * @swagger
 *
 * definitions:
 *  Episode:
 *    type: object
 *    properties:
 *      epId:
 *        type: integer
 *      name:
 *        type: string
 *      duration:
 *        type: integer
 *      description:
 *        type: string
 *      epNum:
 *        type: integer
 */
