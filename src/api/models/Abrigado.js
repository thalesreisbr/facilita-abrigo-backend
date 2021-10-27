const { Model, DataTypes } = require('sequelize');


class Abrigado extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        documento: DataTypes.STRING,
        telefone: DataTypes.STRING,
        sexo: DataTypes.STRING,
        data_de_nascimento: DataTypes.DATE,
    }, {
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Estadia, { foreignKey:"abrigado_id", as :"estadias"});
  }
}
module.exports = Abrigado;