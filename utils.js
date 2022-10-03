const jwt = require('jsonwebtoken');
const User = require('./models/user.model');

async function getUserByToken(req) {
  let user = null;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.includes('Bearer')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const {
          data: { userId, email },
        } = await jwt.verify(token, 'my super secret');
        user = await User.findById(userId);
        console.log(user);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return user;
}

module.exports = {
  getUserByToken,
};
