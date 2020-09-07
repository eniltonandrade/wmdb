const jwt = require('jsonwebtoken');
require('dotenv').config();

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '365d',
    }, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
}

function userIdfromToken(req) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded.payload.id) return reject();
    return resolve(decoded.payload.id);
  });
}

module.exports = {
  sign,
  userIdfromToken,
};
