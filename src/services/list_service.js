const { Op } = require('sequelize');
const _ = require('lodash');

const db = require('../models');

const { ResponseException } = require('../helper/utils/exception');

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
};

module.exports = ListService;
