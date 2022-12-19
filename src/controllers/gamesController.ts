import { Request, Response } from "express";
import Game from "../models/games";
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class GameController {

  async create(request: Request, response: Response) {
    const authHeader = request.headers.authorization;
    const { console, titulo, resumo, desenvolvedor, categoria } = request.body;

    if (!authHeader) {
      return response.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if (!(parts.length === 2)) {
      return response.status(401).send({ error: 'Token error' });
    }
    const [scheme, token] = parts;
    const bar = "Bearer"
    // if (!/^Bearer$^/i.test(scheme)) {
    if (!scheme.match("Bearer")) {
      return response.status(401).send({ error: scheme });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return response.status(401).send({ error: 'Token Invalido' });

      request.body.userId = decoded.id;
    });


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

  async findHighestRated(req: Request, res: Response) {
    const consoleGame = req.query.console;

    try {

      const games = await Game.find({ console: consoleGame }, null, { limit: 3 }).sort({ avaliacao: -1 });
      return res.json(games);

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      });
    }
  }

  // async findByParameter(req: Request, res: Response) {
  //   const parametro = req.query.parametro;

  //   try {
  //     //const games = await Game.find({ 'console': parametro });
  //     const games = await Game.find(
  //       { $or: [{ titulo: parametro }, { genero: parametro}, { desenvolvedor: parametro}] }
  //     );

  //     return res.json(games);

  //   } catch (error) {
  //     return res.status(500).json({
  //       error: "Algo errado",
  //       message: error,
  //     })
  //   }
  // }

  async findByParameter(req: Request, res: Response) {
    const tituloGame = req.query.titulo;
    const desenvolvedorGame = req.query.desenvolvedor;
    const generogame = req.query.genero;

    try {
      
      

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      })
    }
  }

}

export default new GameController;
