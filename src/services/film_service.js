const { Op } = require('sequelize');
const _ = require('lodash');

const db = require('../models');

const { ResponseException } = require('../utils/exception');

const FilmService = {
  async searchFilmByQuery(query) {
    const { category, actor } = query;
    const name = query.name || '';

    // remove undefined field
    const queryObject = _.pickBy({
      categoryId: category,
      actorId: actor,
    }, _.identity);

    try {
      const filmList = await db.Films.findAll({
        where: {
          name: {
            [Op.substring]: name,
          },
          ...queryObject,
        },
        include: [
          {
            model: db.Actors,
            required: false,
            through: { attributes: [] },
          },
          {
            model: db.Categories,
            required: false,
            through: { attributes: [] },
          },
        ],
      });
      if (filmList) {
        return filmList;
      }
      throw new ResponseException('Film not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },

  async getFilmByIdWithProgress(filmId, userId) {
    try {
      const filmInfo = await db.Films.findOne({
        where: {
          filmId,
        },
        include: [{
          model: db.Episodes,
          required: false,
          include: [
            {
              model: db.Progresses,
              where: {
                userId,
              },
              required: false,
            },
          ],
        }],
      });
      if (filmId) {
        return filmInfo;
      }
      throw new ResponseException('Film not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },
};

module.exports = FilmService;
