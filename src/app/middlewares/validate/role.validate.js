import Role from '../../models/Role';
import * as Yup from 'yup';

export default {
    exists: async (req, res, next) => {
        const role = await Role.findByPk(req.params.roleId);

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }else{
            return next();
        }
    },
    store: async (req, res, next) => {
        const schema = Yup.object().shape({
            code: Yup.string().required(),
            name: Yup.string().required(),
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
            code: Yup.string(),
            name: Yup.string(),
            description: Yup.string(),
        });
        
        try {
            await schema.validate(req.body);
      
            next();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
};
