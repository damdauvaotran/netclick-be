const type = require('sequelize');

module.exports = (db, config) => db.define('categories',
  {
    categoryId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    categoryName: {
      type: type.STRING,
      allowNull: true,
    },
  },
  config);

/**
 * @swagger
 *
 * definitions:
 *  Category:
 *    type: object
 *    properties:
 *      categoryId:
 *        type: integer
 *      categoryName:
 *        type: string
 */
