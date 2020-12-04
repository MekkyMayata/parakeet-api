import express from 'express';
import AuthController from '../controllers/auth_controller/auth.controller';
// import { extractUser } from '../controllers/auth_controller/auth.utils';

const Router = express.Router();

Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);

export default Router;
