const bcrypt = require('bcrypt');
const jwt = require('../libs/jwt');
const { User } = require('../models');

const signup = async (req, res) => {
  const {
    name, username, email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      name,
      username,
      email,
      password: hashedPassword,
    };
    const createdUser = await User.create(user);
    delete createdUser.password;
    return res.status(201).json({
      createdUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
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

    return res.json({
      user: payload,
      expiresIn: 950400,
      token,
    });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports = {
  signup,
  login,
};
