import Role from '../models/Role';

class RoleController {
    async getAll(req, res) {
      const roles = await Role.findAll({
        attributes: ['id','code','name','description'],
      });
    
      return res.json(roles);
    }

    async getOne(req, res) {
      const role = await Role.findOne({
        where: { id: req.params.roleId },
      });

      return res.json(role);
    }

    async store(req, res) {
      const role = await Role.findOne({
        where: { code: req.body.code }
      });

      if (role) {
        return res.status(404).json({ error: 'Role already exists' });
      }
    
      const { id, code, name, description } = await Role.create(req.body);
        
      return res.status(201).json({ id, code, name, description });
    }

    async update(req, res){
      const role = await Role.findByPk(req.params.roleId);

      const { id, name } = await role.update(req.body);

      return res.status(200).json({ id, name });
    }

    async delete(req, res){
      const role = await Role.findByPk(req.params.roleId);
      await role.destroy({ force: true });

      res.send();
    }
}

export default new RoleController();
