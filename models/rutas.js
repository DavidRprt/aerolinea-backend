const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Aeropuerto = require("./aeropuerto")
const Avion = require("./avion")

class Ruta extends Model {}

Ruta.init(
  {
    idruta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    idorigen: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: Aeropuerto,
        key: "idAeropuerto",
      },
    },
    iddestino: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: Aeropuerto,
        key: "idAeropuerto",
      },
    },
    idavion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Avion,
        key: "idAvion",
      },
    },
    preciobase: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    horariosalida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lunes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    martes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    miercoles: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    jueves: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    viernes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sabado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    domingo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ruta",
    tableName: "ruta",
    timestamps: false,
  }
)

Ruta.belongsTo(Avion, { foreignKey: "idavion" })


module.exports = Ruta
