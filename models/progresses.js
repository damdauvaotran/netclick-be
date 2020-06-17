const type = require('sequelize');

module.exports = (db) => db.define('progresses',
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
  },
  {
    underscored: true,
    timestamps: true,
    sequelize: db,
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
 *  Progress:
 *    type: object
 *    properties:
 *      progressId:
 *        type: integer
 *      time:
 *        type: integer
 */
