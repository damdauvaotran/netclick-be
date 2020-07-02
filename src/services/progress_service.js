const db = require('../models');
const { ResponseException } = require('../utils/exception');

const ProgressService = {
  async saveProgress(epId, userId, progress) {
    try {
      const currentProgress = await db.Progresses.findOne({
        where: {
          userId,
          epId,
        },
      });
      if (currentProgress !== null) {
        await db.Progresses.update({ currentTime: progress }, {
          where: {
            userId,
            epId,
          },
        });
      } else {
        // If user not have progress on this film, create one
        await db.Progresses.create({
          userId,
          epId,
          currentTime: progress,
        });
      }
      return await db.Progresses.findOne({
        where: {
          userId,
          epId,
        },
      });
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },
};

module.exports = ProgressService;
