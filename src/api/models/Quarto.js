const { Model, DataTypes } = require('sequelize');


class Quarto extends Model {
  static init(sequelize) {
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        capacidade: DataTypes.INTEGER,
        abrigo_id: DataTypes.INTEGER
    },{
      sequelize,
    });

  }
  static associate(models){
    this.hasMany(models.Imagens, {foreignKey:"quarto_id", as :"imagens"});
    this.belongsTo(models.Abrigo, { foreignKey:"abrigo_id", as :"abrigo"});
    this.belongsToMany(models.Caracteristica, { through: 'Caracteristica_Quartos', as: "caracteristicas" });
  }
}
module.exports = Quarto;