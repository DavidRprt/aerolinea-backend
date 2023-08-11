const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Empleo extends Model {}

Empleo.init(
  {
    idempleo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "empleo",
    tableName: "empleo",
    timestamps: false,
  }
)

module.exports = Empleo
