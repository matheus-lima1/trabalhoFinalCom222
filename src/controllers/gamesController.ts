import { Request, Response } from "express";
import Game from "../models/games";
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class GameController {

  async create(request: Request, response: Response) {
    const authHeader = request.headers.authorization;
    const { console, titulo, avaliacao, imagem, resumo, desenvolvedor, categoria } = request.body;

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

    jwt.verify(token, authConfig.secret, (err: any, decoded: { id: any; }) => {
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
        avaliacao, 
        imagem,
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

      const games = await Game.find({ console: consoleGame }).sort({ avaliacao: -1 }).limit(3);
      return res.json(games);

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      });
    }
  }

  // async findByValue(req: Request, res: Response) {
  //   const valor = req.query.value;

  //   try {
  //     //const games = await Game.find({ 'console': valor });
  //     const games = await Game.find(
  //       { $or: [{ titulo: valor }, { genero: valor }, { desenvolvedor: valor }] }
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
    const generoGame = req.query.genero;
    const desenvolvedorGame = req.query.desenvolvedor;
    const tituloGame = req.query.titulo;

    try {

      if (generoGame) {
        const games = await Game.find({ genero: generoGame }).sort({ avaliacao: -1 }).limit(3);
        return res.json(games);
      }
      else if (desenvolvedorGame) {
        const games = await Game.find({ desenvolvedor: desenvolvedorGame }).sort({ avaliacao: -1 }).limit(3);
        return res.json(games);
      } 
      else if (tituloGame) {
        const games = await Game.find({ titulo: tituloGame }).sort({ avaliacao: -1 }).limit(3);
        return res.json(games);
      }
      
    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      });
    }
  }

}

export default new GameController;
