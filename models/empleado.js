const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Empleo = require("./empleo") 

class Empleado extends Model {}

Empleado.init(
  {
    idempleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    idempleo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleo", 
        key: "idempleo",
      },
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "empleado",
    tableName: "empleado",
    timestamps: false,
  }
)

Empleado.belongsTo(Empleo, { foreignKey: "idempleo", targetKey: "idempleo" })

module.exports = Empleado
