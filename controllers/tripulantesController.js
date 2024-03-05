const Cargo = require("../models/cargo")
const Tripulante = require("../models/tripulante")
const Tripulacion = require("../models/tripulacion")
const EsquemaTripulacion = require("../models/esquemaTripulacion")

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

// Actualizar un tripulante
const updateTripulante = async (req, res) => {
  try {
    const { idtripulante } = req.params;
    const { nombre, apellido, idcargo, idtripulacion } = req.body;

    if (!idtripulante) {
      return res.status(400).json({ error: "El ID del tripulante es obligatorio." });
    }

    const tripulante = await Tripulante.findByPk(idtripulante);

    if (!tripulante) {
      return res.status(404).json({ error: "Tripulante no encontrado." });
    }

    tripulante.nombre = nombre || tripulante.nombre;
    tripulante.apellido = apellido || tripulante.apellido;
    tripulante.idcargo = idcargo || tripulante.idcargo;
    tripulante.idtripulacion = idtripulacion || tripulante.idtripulacion;

    await tripulante.save();

    res.status(200).json(tripulante);
  } catch (error) {
    console.error("Error al actualizar el tripulante:", error);
    res.status(500).json({ error: "Error al actualizar el tripulante." });
  }
};



module.exports = {
  getAllCargos,
  getAllTripulantes,
  getAllTripulaciones,
  addTripulante,
  updateTripulante
}
