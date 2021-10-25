const { Model, DataTypes } = require('sequelize');


class Caracteristica_Quartos extends Model {
  static init(sequelize) {
    super.init({
      quarto_id: DataTypes.INTEGER,
      caracteristica_id: DataTypes.STRING,
    },{
      sequelize,
    });

  }
  // static associate(models){
  //   this.belongsToMany(models.Quarto, { through: 'Caracteristica_Quartos' });
  // }
}
module.exports = Caracteristica_Quartos;