import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";

const PORT = process.argv[2] ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido en variables de entorno");
    }
    console.log(" Conectado a la base de datos");
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  } catch (e) {
    console.error(" No se pudo conectar a la base de datos:", e.message);
    process.exit(1);
  }
});
