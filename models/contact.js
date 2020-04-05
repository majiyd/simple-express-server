
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
  }, {});
  Contact.associate = function (models) {
    // associations can be defined here
  };
  return Contact;
};
