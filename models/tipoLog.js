const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class TipoLog extends Model {}

TipoLog.init(
  {
    tipo_log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "tipo_log",
    tableName: "tipo_log",
    timestamps: false,
  }
)

module.exports = TipoLog
