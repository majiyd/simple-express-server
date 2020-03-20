import Sequelize from 'sequelize';

export default new Sequelize('contact', 'postgres', 'rootpassword', {
  host: 'localhost',
  dialect: 'postgres',
});
