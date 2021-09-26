const { Model, DataTypes } = require('sequelize');


class Usuario extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        cpf: DataTypes.STRING,
        sexo: DataTypes.STRING,
        data_de_nascimento: DataTypes.DATE,
        token: DataTypes.STRING,
        token_recuperar_senha: DataTypes.STRING,
        role: DataTypes.INTEGER
        
    }, {
      sequelize,
    });

  }
  static associate(models){
    this.belongsTo(models.Abrigo, {foreignKey:"abrigo_id", as: "abrigo"});
    this.belongsTo(models.Instituicao, {foreignKey:"instituicao_id", as:"instituicao"});
  }
}
module.exports = Usuario;