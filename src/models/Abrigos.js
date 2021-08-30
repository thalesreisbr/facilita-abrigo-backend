const { Model, DataTypes } = require('sequelize');


class Abrigos extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        cep: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER
        
    },{
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Quartos, {foreignKey:"abrigoId", as :"quartos"});
  }
}
module.exports = Abrigos;