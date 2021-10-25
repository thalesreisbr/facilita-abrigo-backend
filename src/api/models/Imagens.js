const { Model, DataTypes } = require('sequelize');


class Imagens extends Model {
  static init(sequelize) {
    super.init({
        url: DataTypes.STRING,
        quarto_id: DataTypes.INTEGER,
    },{
      sequelize,
    });

  }
  static associate(models){
    this.belongsTo(models.Quarto, { foreignKey:"quarto_id", as :"quarto"});
  }
}
module.exports = Imagens;