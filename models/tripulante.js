const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Cargo = require("./cargo")
const Tripulacion = require("./tripulacion")

class Tripulante extends Model {}

Tripulante.init(
  {
    idtripulante: {
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
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    idcargo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cargo,
        key: "idcargo",
      },
    },
    idtripulacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Tripulacion, 
        key: "idtripulacion",
      },
    },
  },
  {
    sequelize,
    modelName: "tripulante",
    tableName: "tripulante",
    timestamps: false,
  }
)

Tripulante.belongsTo(Cargo, { foreignKey: "idcargo" })
Tripulante.belongsTo(Tripulacion, { foreignKey: "idtripulacion" }) 
Tripulacion.hasMany(Tripulante, { foreignKey: "idtripulacion" })

module.exports = Tripulante
