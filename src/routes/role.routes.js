import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import RoleController from '../app/controllers/RoleController';
import roleValidate from '../app/middlewares/validate/role.validate';

const routes = new Router();

routes.get('/roles', authMiddleware, RoleController.getAll);
routes.get('/roles/:roleId', authMiddleware, roleValidate.exists, RoleController.getOne);
routes.post('/roles', roleValidate.store, RoleController.store);
routes.put('/roles/:roleId', authMiddleware, roleValidate.exists, roleValidate.update, RoleController.update);
routes.delete('/roles/:roleId', authMiddleware, roleValidate.exists, RoleController.delete);

export default routes;
