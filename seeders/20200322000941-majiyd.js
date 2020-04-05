
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contacts', [{
    name: 'majiyd',
    createdAt: new Date(),
    updatedAt: new Date(),
    age: 23,
  }, {
    name: 'lizzy',
    createdAt: new Date(),
    updatedAt: new Date(),
    age: 24,
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contacts', null, {}),
};
