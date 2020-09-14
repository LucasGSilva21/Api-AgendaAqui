import User from '../../models/User';
import * as Yup from 'yup';

export default {
    exists: async (req, res, next) => {
        const user = await User.findByPk(req.params.userId);

        if (user) {
            next();
        }else{ 
            return res.status(404).json({ error: 'User not found' });
        }
    },
    store: async (req, res, next) => {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            roleId: Yup.number().required(),
        });
      
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }else{ 
            next();
        }
    },
    update: async (req, res, next) => {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            roleId: Yup.number(),
        });
      
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }else{ 
            next();
        }
    },
    updatePassword: async (req, res, next) => {
        const schema = Yup.object().shape({
            oldPassword: Yup.string().min(6).required(),
            password: Yup.string().min(6).required(),
        });
      
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }else{ 
            next();
        }
    }
}