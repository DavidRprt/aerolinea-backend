const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const ModeloAvion = require("./modeloAvion")

class Avion extends Model {}

Avion.init(
  {
    idavion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    idmodelo: {
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
    capacidadturista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidadpremium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacidadbusiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "avion",
    tableName: "avion",
    timestamps: false,
  }
)

Avion.belongsTo(ModeloAvion, { foreignKey: "idmodelo", targetKey: "idmodelo" })

module.exports = Avion
