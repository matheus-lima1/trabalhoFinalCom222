import { Request, Response } from "express";
import Review from "../models/review";
import Game from "../models/games";
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class ReviewController {

  async create(request: Request, response: Response) {
    const authHeader = request.headers.authorization;
    const { titulo, texto, nota } = request.body;
    // console.log(authHeader);
    if (!authHeader) {
      return response.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if (!(parts.length === 2)) {
      return response.status(401).send({ error: 'Token error' });
    }
    const [scheme, token] = parts;


    if (!scheme.match("Bearer")) {
      return response.status(401).send({ error: scheme });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return response.status(401).send({ error: 'Token Invalido' });

      request.body.userId = decoded.id;
    });


    try {
      const gameExists = await Game.findOne({ titulo: titulo });

      if (!gameExists) {
        return response.status(400).json({
          error: "Ooops",
          message: "Jogo nao cadastrado",
        })
      }

      if (nota < 0 || nota > 10) {
        return response.status(400).json({
          error: "Ooops",
          message: "A nota precisa ser entre 0 e 10",
        })
      };

      const review = await Review.create({
        titulo,
        texto,
        nota,
      });

      const reviews = await Review.find({ titulo: titulo });
      let soma = 0;
      let count = 0;
      for (const rv of reviews) {
        soma += Number(rv.nota);
        count++;
      }

      const avaliacaomedia = (soma / count);
      console.log(avaliacaomedia);


      await Game.findOneAndUpdate({ titulo: titulo }, { avaliacao: avaliacaomedia });

      return response.json(review);

    } catch (error) {
      return response.status(500).send({
        error: "Registration failed",
        message: error
      })
    }
  }

  // async find(req: Request, res: Response) {
  //   try {
  //     const reviews = await Review.find();
  //     return res.json(games);

  //   } catch (error) {
  //     return res.status(500).json({
  //       error: "Algo errado",
  //       message: error,
  //     })
  //   }
  // }

  async findByTitulo(req: Request, res: Response) {
    const reviewGame = req.query.titulo;
    console.log(req.query)
    try {
      const reviews = await Review.find({ 'titulo': reviewGame });

      return res.json(reviews);

    } catch (error) {
      return res.status(500).json({
        error: "Algo errado",
        message: error,
      })
    }
  }

}

export default new ReviewController;
