const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class MetodoPago extends Model {}

MetodoPago.init(
  {
    idmetodo: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "metodoPago",
    tableName: "metodoPago",
    timestamps: false,
  }
)

module.exports = MetodoPago
