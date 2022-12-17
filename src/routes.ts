import { Router } from 'express';
import UserController from "./controllers/userController";
import GameController from "./controllers/gamesController";
import ReviewController from "./controllers/reviewController";

const routes = Router();

/** USUARIOS */
routes.post("/user", UserController.create);

/** GAMES */
routes.post("/games", GameController.create);

// Consulta todos jogos
routes.get("/games", GameController.find);
// Consulta os jogos por console
routes.get("/games/console", GameController.findByConsole);

/** REVIEWS */
routes.post("/review", ReviewController.create);

routes.get("/review", ReviewController.findByTitulo);

export default routes;