const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class EsquemaTripulacion extends Model {}

EsquemaTripulacion.init(
  {
    id_esquema: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cantidad_tripulantes_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_tripulantes_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duracion_minima: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duracion_maxima: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "esquema_tripulacion",
    tableName: "esquema_tripulacion",
    timestamps: false,
  }
)

module.exports = EsquemaTripulacion
