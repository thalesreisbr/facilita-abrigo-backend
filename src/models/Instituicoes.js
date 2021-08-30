const { Model, DataTypes } = require('sequelize');


class Instituicoes extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        cep: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER
        
    },{
      sequelize,
      modelName:"instituicoes"
    });

  }
  static associate(models){
    // this.belongsTo(models.Church,{foreignKey:"church_id", as :"church"});
    // this.belongsTo(models.Priest, {foreignKey:"priest_id", as:"priest"});
    // this.belongsToMany(models.Faithful,{foreignKey:'mass_id', through: 'mass_faithful', as : 'faithfuls'}); 
  }
}
module.exports = Instituicoes;