const { Model, DataTypes } = require('sequelize');


class Estadia extends Model {
  static init(sequelize) {
    super.init({
        data_inicio: DataTypes.DATE,
        data_saida: DataTypes.DATE,
        observacao: DataTypes.STRING,
        abrigado_id: DataTypes.INTEGER,
        quarto_id: DataTypes.INTEGER,
        instituicao_id: DataTypes.INTEGER,
        
    },{
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Evento, {foreignKey:"estadia_id", as :"eventos"});
    this.belongsTo(models.Quarto, { foreignKey:"quarto_id", as :"quarto"});
    this.belongsTo(models.Instituicao, { foreignKey:"instituicao_id", as :"instituicao"});
    this.belongsTo(models.Abrigado, { foreignKey:"abrigado_id", as :"abrigado"});
    
  }
}
module.exports = Estadia;