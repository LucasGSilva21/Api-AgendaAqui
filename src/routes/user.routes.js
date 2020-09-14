import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/auth';
import userValidate from '../app/middlewares/validate/user.validate';

const routes = new Router();

routes.post('/users', userValidate.store, UserController.store);
routes.get('/users/:userId', authMiddleware, userValidate.exists, UserController.getOne);
routes.get('/users', authMiddleware, UserController.getAll);
routes.put('/users/:userId', authMiddleware, userValidate.exists, userValidate.update, UserController.update);
routes.delete('/users/:userId', authMiddleware, userValidate.exists, UserController.delete);
routes.put('/users/password/:userId', authMiddleware, userValidate.exists, userValidate.updatePassword, UserController.updatePassword);

export default routes;
