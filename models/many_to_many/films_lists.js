module.exports = (db) => db.define('films_lists',
  {
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
