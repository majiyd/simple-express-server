
export default (sequelize, DataTypes) => {
  const PhoneCall = sequelize.define('PhoneCall', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: DataTypes.STRING,
    callerID: DataTypes.INTEGER,
  }, {});
  PhoneCall.associate = (models) => {
    PhoneCall.belongsTo(models.Contact, {
      foreignKey: 'callerID',
    });
  };
  return PhoneCall;
};
