const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Ruta = require("./rutas")
const Cliente = require("./cliente")
const Reserva = require("./reserva")
const Clase = require("./clase")

class Pasaje extends Model {}

Pasaje.init(
  {
    idpasaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    idcliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idclase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idreserva: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "pasaje",
    tableName: "pasaje",
    timestamps: false,
  }
)

Pasaje.belongsTo(Ruta, { foreignKey: "idruta" })
Pasaje.belongsTo(Cliente, { foreignKey: "idcliente" })
Pasaje.belongsTo(Reserva, { foreignKey: "idreserva" })
Pasaje.belongsTo(Clase, { foreignKey: "idclase" })
Cliente.hasMany(Pasaje, { foreignKey: "idcliente" })
Reserva.hasMany(Pasaje, { foreignKey: "idreserva" })

module.exports = Pasaje
