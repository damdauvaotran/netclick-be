const type = require('sequelize');

module.exports = (db) => db.define('categories',
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
 *  Category:
 *    type: object
 *    properties:
 *      categoryId:
 *        type: integer
 *      categoryName:
 *        type: string
 */
