const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Empleado = require("./empleado");
const TipoLog = require("./tipoLog")

class Log extends Model {}

Log.init(
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleado",
        key: "idempleado",
      },
    },
    tipo_log_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tipo_log",
        key: "tipo_log_id",
      },
    },
    creado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "log",
    tableName: "log",
    timestamps: false,
  }
)

// Asociaciones
Log.belongsTo(Empleado, { foreignKey: "usuario_id", targetKey: "idempleado" })
Log.belongsTo(TipoLog, { foreignKey: "tipo_log_id", targetKey: "tipo_log_id" })

module.exports = Log