const type = require('sequelize');

module.exports = (db) => db.define('list',
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
    db,
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
 *  List:
 *    type: object
 *    properties:
 *      listId:
 *        type: integer
 *      listName:
 *        type: string
 */
