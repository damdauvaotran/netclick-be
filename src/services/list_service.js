const { Op } = require('sequelize');
const _ = require('lodash');

const db = require('../models');

const { ResponseException } = require('../utils/exception');

const ListService = {
  async getListByUser(userId) {
    try {
      const filmList = await db.Lists.findAll({
        where: {
          userId,
        },
      });
      return (filmList);
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },

  async getFavoriteListByUser(userId) {
    try {
      const favoriteList = await db.Lists.findOne({
        where: {
          userId,
          favorite: true,
        },
        include: [{
          model: db.Films,
          required: false,
        }],
      });
      if (favoriteList) {
        return favoriteList;
      }
      throw new ResponseException('Favorite film not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
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
    try {
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
          filmId,
          listId: userFavoriteList.listId,
        },
      });

      if (isCreate) {
        return filmList;
      }
      throw new ResponseException('This film has add to list');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },
};

module.exports = ListService;
