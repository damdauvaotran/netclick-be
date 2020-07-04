const logger = require('../utils/logger');

const db = require('../models');

const { ResponseException } = require('../utils/exception');

const ListService = {
  async getListByUser(userId) {
    const filmList = await db.Lists.findAll({
      where: {
        userId,
      },
    });
    return filmList;
  },

  async getFavoriteListByUser(userId) {
    let favoriteList = await db.Lists.findOne({
      where: {
        userId,
        favorite: true,
      },
      include: [
        {
          model: db.Films,
          required: false,
        },
      ],
    });
    if (!favoriteList) {
      favoriteList = await this.createFavoriteList(userId);
    }
    return favoriteList;
  },

  async createFavoriteList(userId) {
    try {
      const userFavoriteList = await db.Lists.findOne({
        where: {
          userId,
          favorite: true,
        },
      });
      if (userFavoriteList) {
        throw new ResponseException('Favorite list has exist');
      } else {
        const createdFavoriteList = await db.Lists.create({
          listName: 'Favorite',
          favorite: true,
          userId,
        });
        return createdFavoriteList;
      }
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },

  async addToFavoriteList(filmId, userId) {
    let userFavoriteList = await db.Lists.findOne({
      where: {
        userId,
        favorite: true,
      },
    });
    if (!userFavoriteList) {
      userFavoriteList = await this.createdFavoriteList(userId);
    }
    const [filmList, isCreate] = await db.FilmsLists.findOrCreate({
      where: {
        film_id: filmId,
        list_id: userFavoriteList.listId,
      },
    });

    if (isCreate) {
      return filmList;
    }
    throw new ResponseException('This film has add to list');
  },

  async removeFromFavorite(filmId, userId) {
    let userFavoriteList = await db.Lists.findOne({
      where: {
        userId,
        favorite: true,
      },
    });
    if (!userFavoriteList) {
      userFavoriteList = await this.createdFavoriteList(userId);
    }
    const filmList = await db.FilmsLists.destroy({
      where: {
        film_id: filmId,
        list_id: userFavoriteList.listId,
      },
    });

    return filmList;
  },
};

module.exports = ListService;
