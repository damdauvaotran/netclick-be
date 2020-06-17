const type = require('sequelize');

module.exports = (db) => db.define('comments',
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
 *  Comment:
 *    type: object
 *    properties:
 *      commentId:
 *        type: integer
 *      comment:
 *        type: string
 */
