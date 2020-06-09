module.exports = (sequelize, type) => sequelize.define('progresses',
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
    sequelize,
    charset: 'utf8',
    collate: 'utf8_general_ci',
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
