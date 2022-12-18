import { Router } from 'express';
import UserController from "./controllers/userController";
import GameController from "./controllers/gamesController";
import ReviewController from "./controllers/reviewController";
const authMiddleware = require("./middlewares/auth")
// import AuthController from "./controllers/authController";

const routes = Router();

/** USUARIOS */
routes.post("/user", UserController.create);

routes.get("/login", UserController.find)

/** GAMES */
routes.post("/games", GameController.create);

routes.get("/games", GameController.find); // Consulta todos jogos

routes.get("/games/console", GameController.findByConsole); // Consulta os jogos por console

routes.get("/games/bem-avaliados", GameController.findHighestRated); // Consulta os jogos mais bem avaliados

/** REVIEWS */
routes.post("/review", ReviewController.create);

routes.get("/review", ReviewController.findByTitulo);



export default routes;