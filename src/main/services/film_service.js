const { Op } = require('sequelize');
const _ = require('lodash');

const db = require('../models');

const { ResponseException } = require('../utils/exception');
const ListService = require('./list_service');
const logger = require('../utils/logger');

const FilmService = {
  async searchFilmByQuery(query) {
    let { category } = query;
    const { actor } = query;
    const name = query.name || '';


    category = category === '' ? undefined : category;
    category = category ? parseInt(category, 10) : undefined;
    // remove undefined field
    // const queryObject = _.pickBy({
    //   categoryId: category,
    //   actorId: actor,
    // }, _.identity);

    try {
      let filmList;
      if (category) {
        filmList = await db.Films.findAll({
          where: {
            name: {
              [Op.substring]: name,
            },
          },
          include: [
            {
              model: db.Actors,
              required: true,
              through: { attributes: [] },
            },
            {
              model: db.Categories,
              required: true,
              through: { attributes: [], where: { category_id: category } },
            },
          ],
        });
      } else {
        filmList = await db.Films.findAll({
          where: {
            name: {
              [Op.substring]: name,
            },

          },
          include: [
            {
              model: db.Actors,
              required: false,
              through: { attributes: [] },
            },
            {
              model: db.Categories,
              required: true,
              through: { attributes: [] },
            },
          ],
        });
      }

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
      if (filmInfo) {
        let userFavoriteList = await db.Lists.findOne({
          where: {
            userId,
            favorite: true,
          },
        });
        if (!userFavoriteList) {
          userFavoriteList = await ListService.createFavoriteList(userId);
        }
        const filmListInstance = await db.FilmsLists.findOne({
          where: {
            film_id: filmId,
            list_id: userFavoriteList.listId,
          },
        });
        filmInfo.dataValues.liked = !!filmListInstance;
        return filmInfo;
      }
      throw new ResponseException('Film not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },
};

module.exports = FilmService;
