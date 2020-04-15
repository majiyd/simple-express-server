
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    age: DataTypes.NUMBER,
  }, {});
  Contact.associate = (models) => {
    Contact.hasMany(models.PhoneCall, {
      foreignKey: 'id',
    });
  };
  return Contact;
};
