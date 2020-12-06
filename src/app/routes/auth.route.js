import express from 'express';
import AuthController from '../controllers/auth_controller/auth.controller';

const Router = express.Router();

Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);
Router.post('/reset-password', AuthController.passwordReset);
Router.get('/confirm-password', AuthController.confirmPasswordToken);
Router.patch('/update-password', AuthController.updatePassword);

export default Router;
