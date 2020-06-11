module.exports = (sequelize, type) => sequelize.define('comments',
  {
    commentId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
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
 *  Comment:
 *    type: object
 *    properties:
 *      commentId:
 *        type: integer
 *      comment:
 *        type: string
 */
