const type = require('sequelize');

module.exports = (db) => db.define('flims',
  {
    filmId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: type.TEXT,
      allowNull: true,
    },
    description: {
      type: type.TEXT,
      allowNull: true,
    },
    imdb: {
      type: type.FLOAT,
      allowNull: true,
    },
    year: {
      type: type.INTEGER,
      allowNull: true,
    },
    starring: {
      type: type.TEXT,
      allowNull: false,
    },
    epCount: {
      type: type.INTEGER,
      allowNull: false,
    },
    imgUri: {
      type: type.TEXT,
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
 *  Film:
 *    type: object
 *    properties:
 *      filmId:
 *        type: integer
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      imdb:
 *        type: number
 *      year:
 *        type: integer
 *      starring:
 *        type: string
 *      epNum:
 *        type: integer
 *      imgUri:
 *        type: string
 */
