module.exports = (sequelize, type) => sequelize.define('episodes',
  {
    epId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: true,
    },
    description: {
      type: type.STRING,
      allowNull: true,
    },
    uri: {
      type: type.STRING,
      allowNull: false,
    },
    epNum: {
      type: type.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

/**
 * @swagger
 *
 * definitions:
 *  Episode:
 *    type: object
 *    properties:
 *      epId:
 *        type: integer
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      epNum:
 *        type: integer
 */
