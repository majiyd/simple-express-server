
export default (sequelize, DataTypes) => {
  const PhoneCall = sequelize.define('PhoneCall', {
    uuid: DataTypes.UUIDV4,
    type: DataTypes.STRING,
    callerID: DataTypes.INTEGER,
  }, {});
  PhoneCall.associate = (models) => {
    PhoneCall.belongsTo(models.Contact, {
      foreign_key: 'callerID',
    });
  };
  return PhoneCall;
};
