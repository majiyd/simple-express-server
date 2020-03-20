import Sequelize from 'sequelize';
import db from '../config/database';

const Contact = db.define('contacts', {
  name: {
    type: Sequelize.STRING,
  },
});

export { Contact };
