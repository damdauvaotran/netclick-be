const type = require('sequelize');

module.exports = (db) => db.define('actors',
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
 *  Actor:
 *    type: object
 *    properties:
 *      actorId:
 *        type: integer
 *      actorName:
 *        type: string
 */
