const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  quoteIdentifiers: false,
  host: "localhost",
  dialect: "postgres",
})

// Verificar la conexión con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa con la base de datos")
  })
  .catch((err) => {
    console.error("Error de conexión o consulta:", err)
  })

module.exports = sequelize
