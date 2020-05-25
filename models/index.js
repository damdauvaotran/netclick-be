const Sequelize = require('sequelize');
const UserModel = require('./users');
const FilmModel = require('./films');
const EpisodeModel = require('./episodes');
const ProgressModel = require('./progess');
const migrationFilmList = require('../db_migration/films_migration');
const migrationEpList = require('../db_migration/episode_migration');
const migrationProcess = require('../db_migration/progress_migration');
const migrationUser = require('../db_migration/user_migration');

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
const Films = FilmModel(db, Sequelize);
const Episodes = EpisodeModel(db, Sequelize);
const Progress = ProgressModel(db, Sequelize);

Films.hasMany(Episodes, { foreignKey: 'filmId' });
Episodes.belongsTo(Films, { foreignKey: 'filmId' });

Episodes.hasMany(Progress, { foreignKey: 'epId' });
Progress.belongsTo(Episodes, { foreignKey: 'epId' });

Users.hasMany(Progress, { foreignKey: 'userId' });
Progress.belongsTo(Users, { foreignKey: 'userId' });


db.sync({ force: false }).then(async () => {
  console.log('Database & tables created!');
  const listFilm = await Films.findAll();
  if (listFilm.length === 0) {
    console.log('Empty film list, Start migrate data');
    await Users.bulkCreate(migrationUser);
    await Films.bulkCreate(migrationFilmList);
    await Episodes.bulkCreate(migrationEpList);
    await Progress.bulkCreate(migrationProcess);
  } else {
    console.log('Db has exist, Migration canceled');
  }
});

module.exports = {
  Users, Films, Episodes, Progress,
};
