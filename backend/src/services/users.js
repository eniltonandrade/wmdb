const { User } = require('../models');

const getAll = async () => {
  try {
    const userList = await User.findAll();
    return userList;
  } catch (err) {
    throw new Error(err);
  }
};

const getOne = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw new Error('Error');
  }
};

const getByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error('Error');
  }
};

const save = async (userData) => {
  const user = await User.create(userData);
  return user;
};

module.exports = {
  getAll,
  getOne,
  save,
  getByEmail,
};
