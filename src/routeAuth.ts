import { Router } from 'express';
import UserController from "./controllers/userController";
import GameController from "./controllers/gamesController";
import ReviewController from "./controllers/reviewController";
// import { authMiddleware } from "./middlewares/auth";
// import AuthController from "./controllers/authController";

const routes = Router();

/** USUARIOS */
routes.post("/user", UserController.create);

routes.get("/login", UserController.find)

/** GAMES */
routes.post("/games", GameController.create);

/** REVIEWS */
routes.post("/review", ReviewController.create);


export default routes;
module.exports = app => app.use('/teste', routes);