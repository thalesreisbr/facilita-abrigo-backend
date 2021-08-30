const { Model, DataTypes } = require('sequelize');


class Exemplo extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        
    }, {
      sequelize
    });

  }
  static associate(models){
    
    // this.belongsTo(models.Priest, {foreignKey:"priest_id", as:"priest"});
    // this.belongsToMany(models.Faithful,{foreignKey:'mass_id', through: 'mass_faithful', as : 'faithfuls'}); 
  }
}
module.exports = Exemplo;