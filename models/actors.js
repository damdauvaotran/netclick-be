module.exports = (sequelize, type) => sequelize.define('actors',
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
    sequelize,
    charset: 'utf8',
    collate: 'utf8_general_ci',
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
