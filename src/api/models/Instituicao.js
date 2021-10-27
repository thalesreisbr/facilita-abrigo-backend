const { Model, DataTypes } = require('sequelize');


class Instituicao extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        cep: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        aprovado: DataTypes.BOOLEAN,
    },{
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Estadia, {foreignKey:"instituicao_id", as :"estadia"});
    this.hasMany(models.Usuario, {foreignKey:"instituicao_id", as :"funcionarios"});
  }
}
module.exports = Instituicao;