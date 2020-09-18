import { Router } from 'express';
import AppointmentController from '../app/controllers/AppointmentController';
import authMiddleware from '../app/middlewares/auth';
import appointmentValidate from '../app/middlewares/validate/appointment.validate';

const routes = new Router();

routes.post('/appointments', appointmentValidate.store, AppointmentController.store);
routes.get('/appointments/:appointmentId', authMiddleware, appointmentValidate.exists, AppointmentController.getOne);
routes.get('/appointments', authMiddleware, AppointmentController.getAll);
routes.put('/appointments/:appointmentId', authMiddleware, appointmentValidate.exists, appointmentValidate.update, AppointmentController.update);
routes.delete('/appointments/:appointmentId', authMiddleware, appointmentValidate.exists, AppointmentController.delete);
routes.get('/appointments/user/:userId', authMiddleware, AppointmentController.getAllUser);

export default routes;
