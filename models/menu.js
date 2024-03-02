const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

class Menu extends Model {}

Menu.init(
  {
    id_menu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "menu",
    tableName: "menu",
    timestamps: false,
  }
)

module.exports = Menu
