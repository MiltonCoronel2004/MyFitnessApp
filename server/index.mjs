import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.mjs";
import { routes } from "./routes/User.mjs"; 
import { progressRoutes } from "./routes/progress.mjs";
// Importar modelos y relaciones para sincronización
import "./models/associations.mjs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const PORT = process.argv[2] ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiter básico para la API
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 60, // 60 requests por IP por minuto
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
app.use("/api/users", routes);
app.use("/api/v1/progress", progressRoutes);

app.listen(PORT, async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no definido en variables de entorno');
    }
    
    await sequelize.sync({ alter: true });
    console.log(" Conectado a la base de datos");
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  } catch (e) {
    console.error(" No se pudo conectar a la base de datos:", e.message);
    process.exit(1); // Salir si no hay conexión a DB
  }
});