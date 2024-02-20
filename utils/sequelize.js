const { Sequelize } = require("sequelize")

class SequelizeSingleton {
  constructor() {
    if (!SequelizeSingleton.instance) {
      const dbConfig = {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, 
          },
        },
      }

      SequelizeSingleton.instance = new Sequelize(dbConfig)

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
