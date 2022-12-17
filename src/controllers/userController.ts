import { Request, Response } from "express";
import User from "../models/user";
const bcrypt = require('bcrypt');


class UserController {

  async create(request: Request, response: Response) {

    const { name, email, password } = request.body;
    try {
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "User already exists",
        })
      }

      const user = await User.create({
        name,
        email,
        password
      });
      return response.json(user);

    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error
      })
    }
  }

  async find(req: Request, res: Response) {
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
  }
}

export default new UserController;