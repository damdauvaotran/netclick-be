const type = require('sequelize');

module.exports = (db) => db.define('episodes',
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
  {
    sequelize: db,
    underscored: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });

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
