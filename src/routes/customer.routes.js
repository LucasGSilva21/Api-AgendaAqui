import { Router } from 'express';
import CustomerController from '../app/controllers/CustomerController';
import authMiddleware from '../app/middlewares/auth';
import customerValidate from '../app/middlewares/validate/customer.validate';

const routes = new Router();

routes.post('/customers', authMiddleware, customerValidate.store, CustomerController.store);
routes.get('/customers/:customerId', authMiddleware, customerValidate.exists, CustomerController.getOne);
routes.get('/customers', authMiddleware, CustomerController.getAll);
routes.put('/customers/:customerId', authMiddleware, customerValidate.exists, customerValidate.update, CustomerController.update);
routes.delete('/customers/:customerId', authMiddleware, customerValidate.exists, CustomerController.delete);

export default routes;
