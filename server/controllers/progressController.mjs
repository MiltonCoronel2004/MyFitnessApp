import { Metricas, RegistrosFuerza, User } from "../models/associations.mjs";

// ID de usuario simulado para pruebas
const simulatedUserId = 1;

// TAREA 1: CONTROLADOR DE MÉTRICAS CORPORALES

/**
 * POST /api/v1/progress/metrics
 * Registra métricas corporales del usuario
 */
export const createMetrics = async (req, res) => {
  try {
    const { pesoKg, cinturaCm, pechoCm, bicepsCm, cuadricepsCm, pantorrillaCm } = req.body;

    // Validación estricta - pesoKg es obligatorio
    if (!pesoKg || typeof pesoKg !== 'number' || pesoKg <= 0) {
      return res.status(400).json({
        error: true,
        msg: 'pesoKg es obligatorio y debe ser un número positivo'
      });
    }

    // Validación de campos opcionales (si están presentes, deben ser números positivos)
    const optionalFields = { cinturaCm, pechoCm, bicepsCm, cuadricepsCm, pantorrillaCm };
    for (const [field, value] of Object.entries(optionalFields)) {
      if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
        return res.status(400).json({
          error: true,
          msg: `${field} debe ser un número positivo si se proporciona`
        });
      }
    }

    // Crear registro de métricas en la base de datos
    const metricsRecord = await Metricas.create({
      userId: simulatedUserId,
      pesoKg,
      cinturaCm: cinturaCm || null,
      pechoCm: pechoCm || null,
      bicepsCm: bicepsCm || null,
      cuadricepsCm: cuadricepsCm || null,
      pantorrillaCm: pantorrillaCm || null
    });

    res.status(201).json({
      error: false,
      msg: 'Métricas registradas correctamente',
      data: metricsRecord
    });

  } catch (error) {
    console.error('Error en createMetrics:', error);
    res.status(500).json({
      error: true,
      msg: 'Error interno del servidor'
    });
  }
};

/**
 * GET /api/v1/progress/metrics/history
 * Obtiene historial de métricas ordenado por fecha descendente
 */
export const getMetricsHistory = async (req, res) => {
  try {
    // Obtener métricas del usuario con información del usuario
    const userMetrics = await Metricas.findAll({
      where: { userId: simulatedUserId },
      include: [{
        model: User,
        as: 'usuario',
        attributes: ['id', 'fullName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      error: false,
      msg: 'Historial de métricas obtenido correctamente',
      data: userMetrics,
      count: userMetrics.length
    });

  } catch (error) {
    console.error('Error en getMetricsHistory:', error);
    res.status(500).json({
      error: true,
      msg: 'Error interno del servidor'
    });
  }
};

// TAREA 2: CONTROLADOR DE REGISTRO DE FUERZA (RM)

/**
 * POST /api/v1/progress/rms
 * Registra récords de fuerza del usuario
 */
export const createRms = async (req, res) => {
  try {
    const { nombreEjercicio, pesoLevantadoKg, repeticiones, numeroSerie } = req.body;

    // Validación estricta de campos obligatorios
    if (!nombreEjercicio || typeof nombreEjercicio !== 'string' || nombreEjercicio.trim().length === 0) {
      return res.status(400).json({
        error: true,
        msg: 'nombreEjercicio es obligatorio y debe ser una cadena no vacía'
      });
    }

    if (!pesoLevantadoKg || typeof pesoLevantadoKg !== 'number' || pesoLevantadoKg <= 0) {
      return res.status(400).json({
        error: true,
        msg: 'pesoLevantadoKg es obligatorio y debe ser un número positivo'
      });
    }

    if (!repeticiones || typeof repeticiones !== 'number' || repeticiones <= 0 || !Number.isInteger(repeticiones)) {
      return res.status(400).json({
        error: true,
        msg: 'repeticiones es obligatorio y debe ser un número entero positivo'
      });
    }

    // Validación de campo opcional numeroSerie
    if (numeroSerie !== undefined && (typeof numeroSerie !== 'number' || numeroSerie <= 0 || !Number.isInteger(numeroSerie))) {
      return res.status(400).json({
        error: true,
        msg: 'numeroSerie debe ser un número entero positivo si se proporciona'
      });
    }

    // Crear registro de RM en la base de datos
    const rmsRecord = await RegistrosFuerza.create({
      userId: simulatedUserId,
      nombreEjercicio: nombreEjercicio.trim(),
      pesoLevantadoKg,
      repeticiones,
      numeroSerie: numeroSerie || null
    });

    res.status(201).json({
      error: false,
      msg: 'Récord de fuerza registrado correctamente',
      data: rmsRecord
    });

  } catch (error) {
    console.error('Error en createRms:', error);
    res.status(500).json({
      error: true,
      msg: 'Error interno del servidor'
    });
  }
};

/**
 * GET /api/v1/progress/rms/history
 * Obtiene historial de récords de fuerza ordenado por fecha descendente
 */
export const getRmsHistory = async (req, res) => {
  try {
    // Obtener récords de fuerza del usuario con información del usuario
    const userRms = await RegistrosFuerza.findAll({
      where: { userId: simulatedUserId },
      include: [{
        model: User,
        as: 'usuario',
        attributes: ['id', 'fullName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      error: false,
      msg: 'Historial de récords de fuerza obtenido correctamente',
      data: userRms,
      count: userRms.length
    });

  } catch (error) {
    console.error('Error en getRmsHistory:', error);
    res.status(500).json({
      error: true,
      msg: 'Error interno del servidor'
    });
  }
};

// ENDPOINT ADICIONAL: Obtener usuario con todo su progreso
export const getUserProgress = async (req, res) => {
  try {
    // Obtener usuario con todas sus métricas y récords de fuerza
    const user = await User.findByPk(simulatedUserId, {
      include: [
        {
          model: Metricas,
          as: 'metricas',
          order: [['createdAt', 'DESC']],
          limit: 10 // Últimas 10 métricas
        },
        {
          model: RegistrosFuerza,
          as: 'registrosFuerza',
          order: [['createdAt', 'DESC']],
          limit: 10 // Últimos 10 récords
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        msg: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      error: false,
      msg: 'Progreso del usuario obtenido correctamente',
      data: user
    });

  } catch (error) {
    console.error('Error en getUserProgress:', error);
    res.status(500).json({
      error: true,
      msg: 'Error interno del servidor'
    });
  }
};
