const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  quoteIdentifiers: false,
  host: "localhost",
  dialect: "postgres"
})

module.exports = sequelize
