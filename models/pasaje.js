const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Ruta = require("./rutas")
const Cliente = require("./cliente")

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
    fechaida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechavuelta: {
      type: DataTypes.DATE,
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
Cliente.hasMany(Pasaje, { foreignKey: "idcliente" })

module.exports = Pasaje
