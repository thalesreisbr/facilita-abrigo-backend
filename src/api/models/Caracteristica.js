const { Model, DataTypes } = require('sequelize');


class Caracteristica extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
    },{
      sequelize,
    });

  }
  static associate(models){
    this.belongsToMany(models.Quarto, { through: 'Caracteristica_Quartos' });
  }
}
module.exports = Caracteristica;