const { Model, DataTypes } = require('sequelize');


class Abrigo extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        aprovado: DataTypes.BOOLEAN,
        telefone: DataTypes.STRING,
        cep: DataTypes.STRING,
        cidade: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER
        
    },{
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Quarto, {foreignKey:"abrigo_id", as :"quartos"});  
    this.hasMany(models.Usuario, {foreignKey:"abrigo_id", as :"funcionarios"});
  }
}
module.exports = Abrigo;