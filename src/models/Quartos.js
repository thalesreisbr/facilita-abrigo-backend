const { Model, DataTypes } = require('sequelize');


class Quartos extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        capacidade: DataTypes.INTEGER,
        vagasPreenchidas: DataTypes.INTEGER,
        abrigoId: DataTypes.INTEGER
    },{
      sequelize,
    });

  }
  static associate(models){
    this.belongsTo(models.Abrigos, { foreignKey:"abrigoId", as :"abrigo"});
  }
}
module.exports = Quartos;