module.exports = (sequelize, type) => sequelize.define('categories',
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
    sequelize,
    charset: 'utf8',
    collate: 'utf8_general_ci',
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
