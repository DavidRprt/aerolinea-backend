const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class ModeloAvion extends Model {}

ModeloAvion.init(
  {
    idmodelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    modelo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    autonomia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "modeloavion",
    tableName: "modeloavion",
    timestamps: false,
  }
)

module.exports = ModeloAvion
