import Sequelize, { Model } from 'sequelize';
import Role from './Role';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      passwordHash: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'users',
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passwordHash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
  
  static associate(models){
    this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }

  static async getOne(id){
    const user = await this.findOne({
      where: { id },
      attributes: ['id','name','email'],
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });

    return user;
  }

  static async getAll(){
    const users = await User.findAll({
      attributes: ['id','name','email'],
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });

    return users;
  }
}

export default User;
