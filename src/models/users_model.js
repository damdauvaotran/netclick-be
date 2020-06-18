const type = require('sequelize');

module.exports = (db, config) => db.define('users',
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
  },
  config);

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
