import express from 'express';
import AuthController from '../controllers/auth_controller/auth.controller';
// import { extractUser } from '../controllers/auth_controller/auth.utils';

const Router = express.Router();

Router.post('/register', AuthController.register);

export default Router;
