const Cargo = require("../models/cargo")
const Tripulante = require("../models/tripulante")
const Tripulacion = require("../models/tripulacion")
const EsquemaTripulacion = require("../models/esquemaTripulacion")
const LogTripulante = require("../models/logTripulante")
const Empleado = require("../models/empleado")

// Obtener todos los cargos
const getAllCargos = async (req, res) => {
  try {
    const cargos = await Cargo.findAll()
    res.status(200).json(cargos)
  } catch (error) {
    console.error("Error al obtener los cargos:", error)
    res.status(500).json({ error: "Error al obtener los cargos" })
  }
}

// Obtener todos los tripulantes con el nombre de su cargo y tripulación
const getAllTripulantes = async (req, res) => {
  try {
    const tripulantes = await Tripulante.findAll({
      include: [
        {
          model: Cargo,
          attributes: ["nombre", "idcargo"],
        },
        {
          model: Tripulacion,
          attributes: ["nombre"], 
        },
      ],
    })
    res.status(200).json(tripulantes)
  } catch (error) {
    console.error("Error al obtener los tripulantes:", error)
    res.status(500).json({ error: "Error al obtener los tripulantes" })
  }
}

// Obtener todas las tripulaciones incluyendo un array con cada miembro y sus datos
const getAllTripulaciones = async (req, res) => {
  try {
    const tripulaciones = await Tripulacion.findAll({
      include: [
        {
          model: Tripulante,
          include: [Cargo],
        },
        {
          model: EsquemaTripulacion, // Incluir el modelo EsquemaTripulacion
        },
      ],
    })
    console.log(tripulaciones)
    res.status(200).json(tripulaciones)
  } catch (error) {
    console.error("Error al obtener las tripulaciones:", error)
    res.status(500).json({ error: "Error al obtener las tripulaciones" })
  }
}

// Añadir un nuevo tripulante
const addTripulante = async (req, res) => {
  try {
    const { nombre, apellido, cargo } = req.body
    const idcargo = cargo
    const idtripulacion = 13

    if (!nombre || !apellido || !cargo ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." })
    }



    const newTripulante = await Tripulante.create({
      nombre,
      apellido,
      idcargo,
      idtripulacion,
    })

    res.status(201).json(newTripulante)
  } catch (error) {
    console.error("Error al agregar el tripulante:", error)
    res.status(400).json({ error: "Error al agregar el tripulante." }) // Cambié el código de estado a 400 para indicar un error en la solicitud.
  }
}

const updateTripulante = async (req, res) => {
  try {
    const { idtripulante } = req.params
    const { nombre, apellido, idcargo, idtripulacion, idempleado } = req.body


    // Asegurarse de que el idempleado se ha proporcionado y no es nulo
    if (!idempleado) {
      return res
        .status(400)
        .json({ error: "El ID del empleado es obligatorio." })
    }

    const tripulante = await Tripulante.findByPk(idtripulante)

    if (!tripulante) {
      return res.status(404).json({ error: "Tripulante no encontrado." })
    }

    // Capturar los datos anteriores antes de realizar la actualización
    const datosAnteriores = {
      nombre_anterior: tripulante.nombre,
      apellido_anterior: tripulante.apellido,
      cargo_id_anterior: tripulante.idcargo,
      tripulacion_id_anterior: tripulante.idtripulacion,
    }

    // Actualizar con los nuevos datos
    tripulante.nombre = nombre || tripulante.nombre
    tripulante.apellido = apellido || tripulante.apellido
    tripulante.idcargo = idcargo || tripulante.idcargo
    tripulante.idtripulacion = idtripulacion || tripulante.idtripulacion

    await tripulante.save()

    // Crear un registro de log con los datos antiguos y nuevos
    await LogTripulante.create({
      tripulante_id: idtripulante,
      usuario_id: idempleado,
      ...datosAnteriores,
      nombre_actualizado: tripulante.nombre,
      apellido_actualizado: tripulante.apellido,
      cargo_id_actualizado: tripulante.idcargo,
      tripulacion_id_actualizada: tripulante.idtripulacion,
      hora: new Date(),
    })

    res.status(200).json(tripulante)
  } catch (error) {
    console.error("Error al actualizar el tripulante:", error)
    res.status(500).json({ error: "Error al actualizar el tripulante." })
  }
}

const getAllLogTripulantes = async (req, res) => {
  try {
    const logTripulantes = await LogTripulante.findAll({
      include: [
        {
          model: Tripulante,
          include: [
            {
              model: Cargo,
              attributes: ["nombre"],
            },
            {
              model: Tripulacion,
              attributes: ["nombre"],
            },
          ],
          attributes: ["nombre", "apellido"],
        },
        {
          model: Empleado,
          attributes: ["nombre", "apellido", "email"],
        },
      ],
    })
    res.status(200).json(logTripulantes)
  } catch (error) {
    console.error("Error al obtener los logs de tripulantes:", error)
    res.status(500).json({ error: "Error al obtener los logs de tripulantes" })
  }
}



module.exports = {
  getAllCargos,
  getAllTripulantes,
  getAllTripulaciones,
  addTripulante,
  updateTripulante,
  getAllLogTripulantes
}
