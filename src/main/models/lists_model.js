const type = require('sequelize');

module.exports = (db, config) => db.define('list',
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
    favorite: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  },
  config);

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
