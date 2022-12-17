const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  const gameExists = await User.findOne({ email: email });

  if (gameExists) {
    return res.status(400).json({
      error: "Ooops",
      message: "email already exists",
    })
  }

  try {
    const user = User.create(req.body);

    return res.send({ user });
  } catch (err) {
    return res.status(404).send({ error: 'Registration Failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return res.status(400).json({
      error: "Ooops",
      message: "user not found",
    })
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).json({
      error: "Ooops",
      message: "Senha incorreta",
    })
  }

  res.send({ user })

})

module.exports = app => app.use('/auth', router);