module.exports = (sequelize, type) => sequelize.define('flims',
  {
    filmId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: true,
    },
    description: {
      type: type.STRING,
      allowNull: true,
    },
    imdb: {
      type: type.FLOAT,
      allowNull: true,
    },
    epCount: {
      type: type.INTEGER,
      allowNull: false,
    },
    imgUri: {
      type: type.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
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
 *        type: float
 *      epNum:
 *        type: integer
 *      imgUri:
 *        type: string
 */
