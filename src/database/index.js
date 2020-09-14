import Sequelize from 'sequelize';

import Role from '../app/models/Role';
import User from '../app/models/User';

const env = process.env.NODE_ENV || 'development';

const config = require('../config/database.js')[env];

const models = [Role, User];

class Database {

  constructor() {
    this.init();
  }

  init() {

    if (config.use_env_variable) {
      this.connection = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      this.connection = new Sequelize(config);
    }

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
