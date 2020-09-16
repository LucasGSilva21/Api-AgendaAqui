import Appointment from '../../models/Appointment';
import * as Yup from 'yup';

export default {
    exists: async (req, res, next) => {
        const user = await Appointment.findByPk(req.params.appointmentId);

        if (user) {
            next();
        }else{ 
            return res.status(404).json({ error: 'Appointment not found' });
        }
    },
    store: async (req, res, next) => {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            description: Yup.string().required(),
            userId: Yup.number().required(),
            customerId: Yup.number().required(),
        });

        console.log("entrou")
      
        try {
            await schema.validate(req.body);
      
            next();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    update: async (req, res, next) => {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            description: Yup.string().required(),
            userId: Yup.number().required(),
            customerId: Yup.number().required(),
        });
      
        try {
            await schema.validate(req.body);
      
            next();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
}
