const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")


class Aeropuerto extends Model {}

Aeropuerto.init(
  {
    idaeropuerto: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    latitud: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "aeropuerto",
    tableName: "aeropuerto",
    timestamps: false,
  }
)


module.exports = Aeropuerto