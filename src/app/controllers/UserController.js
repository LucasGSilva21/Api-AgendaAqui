import User from '../models/User';
import Role from '../models/Role';

class UserController {
  async getOne(req, res) {
    const user = await User.getOne(req.params.userId);

    return res.json(user);
  }

  async getAll(req, res) {
    const users = await User.getAll();

    return res.json(users);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const role = await Role.findOne({
      where: { id: req.body.roleId }
    });

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const { id, name, email, roleId } = await User.create(req.body);
    
    return res.status(201).json({ id, name, email, roleId });
  }

  async update(req, res) {
    const { email, roleId } = req.body;

    const user = await User.findByPk(req.params.userId);

    if (email && (email !== user.email)) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(409).json({ error: 'User already exists.' });
      }
    }

    if(roleId){
      const role = await Role.findOne({
        where: { id: req.body.roleId }
      });
  
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email, roleId });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.userId);
    await user.destroy({ force: true });

    return res.send();
  }

  async updatePassword(req, res){
    const { oldPassword } = req.body;

    const user = await User.findByPk(req.params.userId);

    if(!(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, email, roleId } = await user.update(req.body);
  
    return res.json({ id, name, email, roleId });
  } 
}

export default new UserController();
