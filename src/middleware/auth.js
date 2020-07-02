const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const jwtPrivateKey = process.env.PRIVATE_KEY_JWT || '!bE8JX7!owd!W67&XEU9kw2W';

module.exports.getUserIdByToken = async (token) => {
  const decodedData = await jwt.verify(token, jwtPrivateKey);
  const { id } = decodedData;
  return id;
};

module.exports.getTokenByRequest = (req) => req.headers.authorization
&& req.headers.authorization.replace('Bearer ', '');

module.exports.validateUser = async (req, res, next) => {
  const authToken = this.getTokenByRequest(req);
  try {
    // Keep try catch logic
    const id = await this.getUserIdByToken(authToken);
    const requestUser = await Users.findOne({ where: { userId: id } });
    if (requestUser) {
      next();
    } else {
      res.json({
        success: false,
        message: 'You do no have permission to perform this action',
      });
    }
  } catch (e) {
    // Wrong token will be push to here
    res.json({
      success: false,
      message: 'You do no have permission to perform this action',
    });
  }
};

module.exports.validateAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
  try {
    // Keep try catch logic
    const decodedData = await jwt.verify(authToken, jwtPrivateKey);
    const { id } = decodedData;
    const requestUser = await Users.findOne({ where: { userId: id } });

    if (requestUser.role === role.ADMIN) {
      next();
    } else {
      res.json({
        success: false,
        message: 'You do no have permission to perform this action',
        data: requestUser,
      });
    }
  } catch (e) {
    // Wrong token will be push to here
    res.json({
      success: false,
      message: 'You do no have permission to perform this action',
    });
  }
};
