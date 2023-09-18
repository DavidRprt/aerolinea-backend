const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Tripulante = require("./tripulante") 

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
  },
  {
    sequelize,
    modelName: "tripulacion",
    tableName: "tripulacion",
    timestamps: false,
  }
)


module.exports = Tripulacion
