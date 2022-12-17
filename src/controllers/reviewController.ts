import { Request, Response } from "express";
import Review from "../models/review";

class ReviewController {

  async create(request: Request, response: Response) {

    const { titulo, texto, nota } = request.body;
    try {
      const gameExists = await Review.findOne({ titulo: titulo });

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
      }


      const review = await Review.create({
        titulo,
        texto,
        nota,
      });
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