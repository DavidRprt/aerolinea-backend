const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Clase extends Model {}

Clase.init(
  {
    idclase: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "clase",
    tableName: "clase",
    timestamps: false,
  }
)

module.exports = Clase
