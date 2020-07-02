const db = require('../models');
const { ResponseException } = require('../utils/exception');

const EpisodeService = {
  async getEpByIdWithProgress(epId, userId) {
    try {
      const episodeInfo = await db.Episodes.findOne({
        where: {
          epId,
        },
        include: [
          {
            model: db.Progresses,
            where: {
              userId,
            },
            required: false,
          },
        ],
      });
      if (episodeInfo) {
        return episodeInfo;
      }
      throw new ResponseException('Film not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },

  async getEpFileById(epId) {
    const episode = await db.Episodes.findOne({
      where: {
        epId,
      },
    });
    if (episode) {
      const { uri } = episode;
      return `./public/movies/${uri}.mp4`;
    }
    throw new ResponseException('Episode not found');
  },
};

module.exports = EpisodeService;
