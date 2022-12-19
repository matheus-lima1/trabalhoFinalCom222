import { Router } from 'express';
import UserController from "./controllers/userController";
import GameController from "./controllers/gamesController";
import ReviewController from "./controllers/reviewController";
//import { Router } from 'express-serve-static-core';
// import {authMiddleware}  from "./middlewares/auth";
// import AuthController from "./controllers/authController";

const routes = Router();

/** USUARIOS */
routes.post("/user", UserController.create);

routes.post("/login", UserController.find)

/** GAMES */
routes.post("/games", GameController.create);

/** REVIEWS */
routes.post("/review", ReviewController.create);


export default routes;
module.exports = (app: { use: (arg0: string, arg1: Router) => any; }) => app.use('/teste', routes);
