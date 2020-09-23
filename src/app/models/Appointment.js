import Sequelize, { Model } from 'sequelize';
import User from './User';
import Customer from './Customer';

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      date: Sequelize.DATE,
      description: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'appointments',
    });

    return this;
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
  }

  static async getOne(id){
    const appointment = await this.findOne({
      where: { id },
      attributes: ['id','date', 'description'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','name','email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id','name','email', 'description'],
        },
      ],
    });

    return appointment;
  }

  static async getAll(){
    const appointments = await this.findAll({
      attributes: ['id','date', 'description'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','name','email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id','name','email', 'description'],
        },
      ],
    });

    return appointments;
  }

  static async getAllUser(userid){
    const appointments = await this.findAll({
      where: { userId: userid },
      attributes: ['id','date', 'description'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','name','email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id','name','email', 'description'],
        },
      ],
    });

    return appointments;
  }
}

export default Appointment;
