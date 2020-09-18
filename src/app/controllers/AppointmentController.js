import Appointment from '../models/Appointment';

class CustomerController {
  async getOne(req, res) {
    const appointment = await Appointment.getOne(req.params.appointmentId);

    return res.json(appointment);
  }

  async getAll(req, res) {
    const appointments = await Appointment.getAll();

    return res.json(appointments);
  }

  async getAllUser(req, res) {
    const appointments = await Appointment.getAllUser(req.params.userId);

    return res.json(appointments);
  }

  async store(req, res) {
    const { id, date, description, userId, customerId } = await Appointment.create(req.body);
    
    return res.status(201).json({ id, date, description, userId, customerId });
  }

  async update(req, res) {
    const appointment = await Appointment.findByPk(req.params.appointmentId);

    const { id, date, description, userId, customerId } = await appointment.update(req.body);

    return res.json({ id, date, description, userId, customerId });
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.appointmentId);
    await appointment.destroy({ force: true });

    return res.send();
  }
}

export default new CustomerController();
