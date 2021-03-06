const bcrypt = require('bcrypt');
const jwt = require('../libs/jwt');
const { User } = require('../models');

const signupUser = async (userData) => {
  const {
    name, username, email, password,
  } = userData;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      username,
      email,
      password: hashedPassword,
    };
    const userCreated = await User.create(user);
    delete userCreated.password;
    return userCreated;
  } catch (err) {
    throw new Error(err);
  }
};

const loginUser = async (userData) => {
  const { email, password } = userData;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Login Issue');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Login Issue');
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email,
    };
    const token = await jwt.sign(payload);
    return {
      user: payload,
      token,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  signupUser,
  loginUser,
};
