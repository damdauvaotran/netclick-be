const Sequelize = require('sequelize');
const UserModel = require('./users');

const DATABASE_NAME = process.env.DATABASE_NAME || 'math_app';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '12345678';

const db = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Users = UserModel(db, Sequelize);

db.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Users,
};
