import { Router } from "express";
import { 
  createMetrics, 
  getMetricsHistory, 
  createRms, 
  getRmsHistory,
  getUserProgress
} from "../controllers/progressController.mjs";

const router = Router();

// TAREA 1: RUTAS DE MÉTRICAS CORPORALES

/**
 * POST /api/v1/progress/metrics
 * Registra métricas corporales del usuario
 * 
 * Body JSON:
 * - pesoKg (obligatorio): Peso en kilogramos
 * - cinturaCm (opcional): Cintura en centímetros
 * - pechoCm (opcional): Pecho en centímetros
 * - bicepsCm (opcional): Bíceps en centímetros
 * - cuadricepsCm (opcional): Cuádriceps en centímetros
 * - pantorrillaCm (opcional): Pantorrilla en centímetros
 */
router.post("/metrics", createMetrics);

/**
 * GET /api/v1/progress/metrics/history
 * Obtiene historial de métricas corporales ordenado por fecha descendente
 */
router.get("/metrics/history", getMetricsHistory);

// TAREA 2: RUTAS DE REGISTRO DE FUERZA (RM)

/**
 * POST /api/v1/progress/rms
 * Registra récords de fuerza del usuario
 * 
 * Body JSON:
 * - nombreEjercicio (obligatorio): Nombre del ejercicio
 * - pesoLevantadoKg (obligatorio): Peso levantado en kilogramos
 * - repeticiones (obligatorio): Número de repeticiones
 * - numeroSerie (opcional): Número de serie
 */
router.post("/rms", createRms);

/**
 * GET /api/v1/progress/rms/history
 * Obtiene historial de récords de fuerza ordenado por fecha descendente
 */
router.get("/rms/history", getRmsHistory);

/**
 * GET /api/v1/progress/user
 * Obtiene usuario con todo su progreso (métricas y récords de fuerza)
 */
router.get("/user", getUserProgress);

export { router as progressRoutes };
