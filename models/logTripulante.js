const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Empleado = require("./empleado")
const Tripulante = require("./tripulante")
const Cargo = require("./cargo")
const Tripulacion = require("./tripulacion")

class LogTripulante extends Model {}

LogTripulante.init(
  {
    log_tripulante_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tripulante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tripulante,
        key: "idtripulante",
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado,
        key: "idempleado",
      },
    },
    nombre_anterior: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    apellido_anterior: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nombre_actualizado: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    apellido_actualizado: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cargo_id_anterior: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cargo,
        key: "idcargo",
      },
    },
    cargo_id_actualizado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cargo,
        key: "idcargo",
      },
    },
    tripulacion_id_anterior: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Tripulacion,
        key: "idtripulacion",
      },
    },
    tripulacion_id_actualizada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Tripulacion,
        key: "idtripulacion",
      },
    },
    hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "log_tripulante",
    tableName: "log_tripulante",
    timestamps: false,
  }
)

// Asociaciones
LogTripulante.belongsTo(Tripulante, { foreignKey: "tripulante_id" })
LogTripulante.belongsTo(Empleado, { foreignKey: "usuario_id" })
LogTripulante.belongsTo(Cargo, {
  as: "CargoAnterior",
  foreignKey: "cargo_id_anterior",
})
LogTripulante.belongsTo(Cargo, {
  as: "CargoActualizado",
  foreignKey: "cargo_id_actualizado",
})
LogTripulante.belongsTo(Tripulacion, {
  as: "TripulacionAnterior",
  foreignKey: "tripulacion_id_anterior",
})
LogTripulante.belongsTo(Tripulacion, {
  as: "TripulacionActualizada",
  foreignKey: "tripulacion_id_actualizada",
})

module.exports = LogTripulante
