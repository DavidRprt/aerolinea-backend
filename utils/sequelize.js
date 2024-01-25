const { Sequelize } = require("sequelize")


// Implementando patrón de diseño singleton
class SequelizeSingleton {
  constructor() {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance = new Sequelize(process.env.DATABASE_URL, {
        quoteIdentifiers: false,
        host: "localhost",
        dialect: "postgres",
      })

      // Verificar la conexión con la base de datos
      SequelizeSingleton.instance
        .authenticate()
        .then(() => console.log("Conexión exitosa con la base de datos"))
        .catch((err) => console.error("Error de conexión o consulta:", err))
    }
    return SequelizeSingleton.instance
  }
}

module.exports = new SequelizeSingleton()
