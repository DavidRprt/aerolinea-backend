const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Token extends Model {}

Token.init(
  {
    id_token: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    idempleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "empleado", 
        key: "idempleado",
      },
      onDelete: "CASCADE",
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fecha_expiracion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "token",
    timestamps: false,
  }
)

module.exports = Token
