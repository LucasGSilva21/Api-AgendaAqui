import Customer from '../../models/Customer';
import * as Yup from 'yup';

export default {
    exists: async (req, res, next) => {
        const customer = await Customer.findByPk(req.params.customerId);

        if (customer) {
            next();
        }else{ 
            return res.status(404).json({ error: 'Customer not found' });
        }
    },
    store: async (req, res, next) => {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            description: Yup.string().required(),
        });
      
        try {
            await schema.validate(req.body);
      
            next();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    update: async (req, res, next) => {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            description: Yup.string(),
        });
      
        try {
            await schema.validate(req.body);
      
            next();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
}
