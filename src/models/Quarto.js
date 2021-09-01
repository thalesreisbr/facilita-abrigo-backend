const { Model, DataTypes } = require('sequelize');


class Quarto extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        capacidade: DataTypes.INTEGER,
        vagasPreenchidas: DataTypes.INTEGER,
        abrigo_id: DataTypes.INTEGER
    },{
      sequelize,
    });

  }
  static associate(models){
    this.belongsTo(models.Abrigo, { foreignKey:"abrigo_id", as :"abrigo"});
  }
}
module.exports = Quarto;