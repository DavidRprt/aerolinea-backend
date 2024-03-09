const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")
const Pasaje = require("./pasaje")

class Equipaje extends Model {}

Equipaje.init(
  {
    idequipaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    idpasaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pasaje", 
        key: "idpasaje",
      },
    }
  },
  {
    sequelize,
    modelName: "equipaje",
    tableName: "equipaje",
    timestamps: false,
  }
)

Pasaje.hasMany(Equipaje, { foreignKey: "idpasaje" })
Equipaje.belongsTo(Pasaje, { foreignKey: "idpasaje" })

module.exports = Equipaje
