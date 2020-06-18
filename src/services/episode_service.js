const db = require('../models');
const { ResponseException } = require('../helper/utils/exception');

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
    try {
      const episode = await db.Episodes.findOne({
        where: {
          episodeId: epId,
        },
      });
      if (episode) {
        const { uri } = episode;
        return `./resources/movies/${uri}.mp4`;
      }
      throw new ResponseException('Episode not found');
    } catch (e) {
      throw new ResponseException(e.toString());
    }
  },
};

module.exports = EpisodeService;
