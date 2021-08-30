const { Model, DataTypes } = require('sequelize');


class Address extends Model {
  static init(sequelize) {
    super.init({
        country: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        city: DataTypes.STRING
    }, {
      sequelize
    });

  }
  static associate(models){
    //this.hasOne(models.Church,{foreignKey:'address_id', as : 'church'});
  }
}
module.exports = Address;