const Sequelize = require('sequelize');

// Single model
const UserModel = require('./users');
const FilmModel = require('./films');
const EpisodeModel = require('./episodes');
const ProgressModel = require('./progresses');
const CategoryModel = require('./categories');
const ActorModel = require('./actors');
const ListModel = require('./list');

// Many to many model
const FilmActorModel = require('./many_to_many/films_actors');
const FilmCategoryModel = require('./many_to_many/films_categories');
const FilmListModel = require('./many_to_many/films_lists');

// Initial data for dev purpose
const migrationFilmList = require('../db_data/films_data');
const migrationEpList = require('../db_data/episode_data');
const migrationProcess = require('../db_data/progress_data');
const migrationUser = require('../db_data/user_data');
const migrationActor = require('../db_data/actor_data');
const migrationCategory = require('../db_data/category_data');
const migrationList = require('../db_data/list_data');
const migrationFilmActor = require('../db_data/film_actor_data');
const migrationFilmCategory = require('../db_data/film_category_data');


const DATABASE_NAME = process.env.DATABASE_NAME || 'math_app';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '12345678';
const DATABASE_URL = process.env.DATABASE_URL || 'localhost';
const DATABASE_PORT = process.env.DATABASE_PORT || '3306';

const db = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_URL,
  port: DATABASE_PORT,
  dialect: 'mysql',
  timezone: '+07:00',
  retry: {
    max: 100,
    timeout: 60 * 60 * 1000,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const tableConfig = {
  underscored: true,
  timestamps: true,
  sequelize: db,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
};

// Single table
const Users = UserModel(db, tableConfig);
const Films = FilmModel(db, tableConfig);
const Episodes = EpisodeModel(db, tableConfig);
const Progresses = ProgressModel(db, tableConfig);
const Categories = CategoryModel(db, tableConfig);
const Actors = ActorModel(db, tableConfig);
const Lists = ListModel(db, tableConfig);

// Many to many table
const FilmsActors = FilmActorModel(db, tableConfig);
const FilmsCategories = FilmCategoryModel(db, tableConfig);
const FilmsLists = FilmListModel(db, tableConfig);

Films.hasMany(Episodes, { foreignKey: 'filmId' });
Episodes.belongsTo(Films, { foreignKey: 'filmId' });

Episodes.hasMany(Progresses, { foreignKey: 'epId' });
Progresses.belongsTo(Episodes, { foreignKey: 'epId' });

Users.hasMany(Progresses, { foreignKey: 'userId' });
Progresses.belongsTo(Users, { foreignKey: 'userId' });

Films.belongsToMany(Categories, { through: FilmsCategories, foreignKey: 'film_id' });
Categories.belongsToMany(Films, { through: FilmsCategories, foreignKey: 'category_id' });

Films.belongsToMany(Actors, { through: FilmsActors, foreignKey: 'film_id' });
Actors.belongsToMany(Films, { through: FilmsActors, foreignKey: 'actor_id' });

Users.hasMany(Lists, { foreignKey: 'userId' });
Lists.belongsTo(Users, { foreignKey: 'userId' });

Lists.belongsToMany(Films, { through: FilmsLists, foreignKey: 'list_id' });
Films.belongsToMany(Lists, { through: FilmsLists, foreignKey: 'film_id' });


db.sync({ force: true }).then(async () => {
  console.log('Database & tables created!');
  const listFilm = await Films.findAll();

  // Import default dev data
  // Todo: Delete this in production
  if (listFilm.length === 0) {
    console.log('Empty film list, Start migrate data');
    await Users.bulkCreate(migrationUser);
    await Films.bulkCreate(migrationFilmList);
    await Episodes.bulkCreate(migrationEpList);
    await Progresses.bulkCreate(migrationProcess);
    await Actors.bulkCreate(migrationActor);
    await Categories.bulkCreate(migrationCategory);
    await Lists.bulkCreate(migrationList);
    await FilmsCategories.bulkCreate(migrationFilmCategory);
    await FilmsActors.bulkCreate(migrationFilmActor);
  } else {
    console.log('Db has exist, Migration canceled');
  }
});

module.exports = {
  Users, Films, Episodes, Progresses, Actors, Categories, Lists,
};
