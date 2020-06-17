const cryptoRandomString = require('crypto-random-string');
const db = require('../models');

const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;
const saltLength = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_LENGTH, 10) : 14;

const UserService = {
  async signUp(userDTO) {
    const { username, password } = userDTO;
    const user = await db.Users.findOne({ where: { username } });
    if (user !== null) {
      return buildRes(res, false, 'User exist');
    }
    try {
      const salt = cryptoRandomString({ length: saltLength });
      const hashedPassword = await bcrypt.hash(password + salt, parseInt(saltRounds, 10));
      await db.Users.create({
        username,
        password: hashedPassword,
        salt,
      });
      return buildRes(res, true, {});
    } catch (e) {
      return buildRes(res, false, e);
    }
  },
};

module.exports = UserService;
