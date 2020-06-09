module.exports = (sequelize, type) => sequelize.define('likeList',
  {
    listId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    listName: {
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
