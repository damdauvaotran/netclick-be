const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { role } = require('../constant');

const jwtPrivateKey = process.env.PRIVATE_KEY_JWT || '!bE8JX7!owd!W67&XEU9kw2W';
module.exports.validateUser = async (req, res, next) => {
  console.log('Full header', req.headers.authorization);
  const authToken = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
  try {
    // Keep try catch logic
    const decodedData = await jwt.verify(authToken, jwtPrivateKey);
    const { id } = decodedData;
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
