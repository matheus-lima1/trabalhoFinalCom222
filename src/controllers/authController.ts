const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req: { body: { email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; message: string; }): any; new(): any; }; send: { (arg0: { error: string; }): any; new(): any; }; }; send: (arg0: { user: any; }) => any; }) => {
  const { email } = req.body;
  const gameExists = await User.findOne({ email: email });

  if (gameExists) {
    return res.status(400).json({
      error: "Ooops",
      message: "email already exists",
    });
  }

  try {
    const user = User.create(req.body);

    return res.send({ user });
  } catch (err) {
    return res.status(404).send({ error: 'Registration Failed' });
  }
});

router.post('/authenticate', async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; message: string; }): any; new(): any; }; }; send: (arg0: { user: any; }) => void; }) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return res.status(400).json({
      error: "Ooops",
      message: "user not found",
    });
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).json({
      error: "Ooops",
      message: "Senha incorreta",
    });
  }

  res.send({ user });

})

module.exports = (app: { use: (arg0: string, arg1: any) => any; }) => app.use('/auth', router);
