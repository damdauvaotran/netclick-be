module.exports = (sequelize, type) => sequelize.define('list',
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
 *  List:
 *    type: object
 *    properties:
 *      listId:
 *        type: integer
 *      listName:
 *        type: string
 */
