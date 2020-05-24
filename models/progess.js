module.exports = (sequelize, type) => sequelize.define('progress',
  {
    progressId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    time: {
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
 *  User:
 *    type: object
 *    properties:
 *      userId:
 *        type: integer
 *      username:
 *        type: string
 *      role:
 *        type: integer
 *      name:
 *        type: string
 */
