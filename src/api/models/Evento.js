const { Model, DataTypes } = require('sequelize');


class Evento extends Model {
  static init(sequelize) {
    super.init({
        descricao: DataTypes.STRING,
        estadia_id: DataTypes.INTEGER
    },{
      sequelize,
    });

  }
  static associate(models){
    //this.belongsTo(models.Estadia, { foreignKey:"estadia_id", as :"estadia"});
  }
}
module.exports = Evento;