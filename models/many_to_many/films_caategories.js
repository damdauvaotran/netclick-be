module.exports = (db, type) => db.define('films_category',
  {
  },
  {
    underscored: true,
    timestamps: true,
    sequelize: db,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
