const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Cliente extends Model {}
Cliente.init(
  {
    idcliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    millas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pasaporte: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "cliente",
    tableName: "cliente",
    timestamps: false,
  }
)

module.exports = Cliente
