
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Contacts', 'age', { type: Sequelize.INTEGER })
    .then((res) => console.log('Successufully ran migration with res: ', res))
    .catch((err) => console.log('Migration failed with err:', err)),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Contacts', 'age')
    .then((res) => console.log('Successufully reversed migration with res: ', res))
    .catch((err) => console.log('Migration reversal failed with err:', err)),
};
