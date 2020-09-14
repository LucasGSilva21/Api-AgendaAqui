import Sequelize, { Model } from 'sequelize';

class Role extends Model {
    static init(sequelize) {
        super.init({
          code: Sequelize.STRING,
          name: Sequelize.STRING,
          description: Sequelize.STRING,
        },
        {
          sequelize,
          tableName: 'roles',
        });
    
        return this;
    }
}

export default Role;
