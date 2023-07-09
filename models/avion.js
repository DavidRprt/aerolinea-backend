const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const ModeloAvion = require("./modeloAvion")

class Avion extends Model {}

Avion.init(
  {
    idAvion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    idModelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidadTurista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidadPremium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidadBusiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Avion",
    tableName: "Avion",
    timestamps: false,
  }
)

Avion.belongsTo(ModeloAvion, { foreignKey: "idModelo", targetKey: "idModelo" })

module.exports = Avion
