module.exports = (sequelize, type) => sequelize.define('users',
  {
    userId: {
      type: type.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: type.STRING,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    salt: {
      type: type.STRING,
      allowNull: false,
    },
    // role: {
    //   type: type.INTEGER,
    //   allowNull: false,
    // },
    name: {
      type: type.STRING,
      allowNull: true,
    },
    createdDate: {
      type: type.DATE,
    },
    lastUpdate: {
      type: type.DATE,
    },
  },
  {
    underscored: true,
    timestamps: false,
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
 *      createdDate:
 *        type: string
 *      lastUpdate:
 *        type: string
 */
