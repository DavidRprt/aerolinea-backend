const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Cargo extends Model {}

Cargo.init(
  {
    idCargo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255), 
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "cargo",
    tableName: "cargo",
    timestamps: false,
  }
)

module.exports = Cargo
