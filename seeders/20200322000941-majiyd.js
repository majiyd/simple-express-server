
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contacts', [{
    name: 'majiyd',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'lizzy',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contacts', null, {}),
};
