import { Request, Response } from "express";
import Game from "../models/games";

class GameController {

  async create(request: Request, response: Response) {

    const { console, titulo, resumo, desenvolvedor, categoria } = request.body;
    try {
      const gameExists = await Game.findOne({ titulo: titulo });

      if (gameExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Titulo already exists",
        })
      }

      const game = await Game.create({
        console,
        titulo,
        resumo,
        desenvolvedor,
        categoria
      });
      return response.json(game);

    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error
      })
    }
  }

  async find(req: Request, res: Response) {
    try {
      const games = await Game.find();
      return res.json(games);

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      })
    }
  }

  async findByConsole(req: Request, res: Response) {
    const consoleGame = req.query.console;
    console.log(req.query)
    try {
      const games = await Game.find({ 'console': consoleGame });

      return res.json(games);

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      })
    }
  }


}

export default new GameController;