import Sequelize from 'sequelize';
import db from '../config/database';

const Contact = db.define('contacts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.TIME,
  },
  updatedAt: {
    type: Sequelize.TIME,
  },
});

export { Contact };
