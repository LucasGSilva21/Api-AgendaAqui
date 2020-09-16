import Customer from '../models/Customer';

class CustomerController {
  async getOne(req, res) {
    const customer = await Customer.getOne(req.params.customerId);

    return res.json(customer);
  }

  async getAll(req, res) {
    const customers = await Customer.getAll();

    return res.json(customers);
  }

  async store(req, res) {
    const customerExists = await Customer.findOne({ where: { email: req.body.email } });

    if (customerExists) {
      return res.status(409).json({ error: 'Customer already exists.' });
    }

    const { id, name, email, description } = await Customer.create(req.body);
    
    return res.status(201).json({ id, name, email, description });
  }

  async update(req, res) {
    const { email } = req.body;

    const customer = await Customer.findByPk(req.params.customerId);

    if (email && (email !== customer.email)) {
      const customerExists = await Customer.findOne({ where: { email } });

      if (customerExists) {
        return res.status(409).json({ error: 'Customer already exists.' });
      }
    }

    const { id, name, description } = await customer.update(req.body);

    return res.json({ id, name, email, description });
  }

  async delete(req, res) {
    const customer = await Customer.findByPk(req.params.customerId);
    await customer.destroy({ force: true });

    return res.send();
  }
}

export default new CustomerController();
