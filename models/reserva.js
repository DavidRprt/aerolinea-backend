const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const MetodoPago = require("./metodoPago") 

class Reserva extends Model {}

Reserva.init(
  {
    idreserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    idmetodo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    fechaemision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    preciototal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reserva",
    tableName: "reserva",
    timestamps: false,
  }
)

Reserva.belongsTo(MetodoPago, { foreignKey: "idmetodo" })

module.exports = Reserva
