const { Model, DataTypes } = require('sequelize');


class Estadia extends Model {
  static init(sequelize) {
    super.init({
        data_inicio: DataTypes.DATE,
        data_saida: DataTypes.DATE,
        status: DataTypes.STRING,
        abrigado_id: DataTypes.INTEGER,
        quarto_id: DataTypes.INTEGER,
        instituicao_id: DataTypes.INTEGER,
    },{
      sequelize,
    });

  }
  static associate(models){
    this.belongsTo(models.Quarto, { foreignKey:"quarto_id", as :"quarto"});
    this.belongsTo(models.Instituicao, { foreignKey:"instituicao_id", as :"insituicao"});
    this.belongsTo(models.Usuario, { foreignKey:"abrigado_id", as :"abrigado"});
  }
}
module.exports = Estadia;