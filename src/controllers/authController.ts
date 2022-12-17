const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = User.create(req.body);

    return res.send({ user });
  } catch (err) {
    return res.status(404).send({ error: 'Registration Failed' });
  }
});

module.exports = app => app.use('/auth', router);