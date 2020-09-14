import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      description: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'customers',
    });

    return this;
  }

  static async getOne(id){
    const customer = await this.findOne({
      where: { id },
      attributes: ['id','name','email', 'description'],
    });

    return customer;
  }

  static async getAll(){
    const customers = await this.findAll({
      attributes: ['id','name','email', 'description'],
    });

    return customers;
  }
}

export default Customer;
