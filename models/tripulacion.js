const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Tripulante = require("./tripulante")
const EsquemaTripulacion = require("./esquemaTripulacion")

class Tripulacion extends Model {}

Tripulacion.init(
  {
    idtripulacion: {
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
    id_esquema: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: "esquema_tripulacion", 
        key: "id_esquema",
      },
    },
  },
  {
    sequelize,
    modelName: "tripulacion",
    tableName: "tripulacion",
    timestamps: false,
  }
)

Tripulacion.belongsTo(EsquemaTripulacion, { foreignKey: "id_esquema" })

module.exports = Tripulacion
