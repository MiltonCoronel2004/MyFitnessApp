import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserInfo, login, register } from "../controllers/userController.js";
import { registerValidator } from "../middleware/validators/userValidator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const userRoutes = Router();

userRoutes.post("/register", registerValidator, register);

userRoutes.post("/login", login);

userRoutes.get("/user", authMiddleware, getUserInfo);

// async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validación básica
//     if (!email || !password) {
//       return res.status(400).json({
//         error: true,
//         msg: "Email y contraseña son requeridos",
//       });
//     }

//     // Buscar usuario
//     // const user = await User.findOne({ where: { email } });

//     // Mensaje genérico para evitar user enumeration
//     const invalidMsg = { error: true, msg: "Credenciales inválidas" };
//     if (!user) return res.status(401).json(invalidMsg);

//     // Comprobar si cuenta activa
//     if (!user.isActive) {
//       return res.status(403).json({
//         error: true,
//         msg: "Cuenta inactiva. Contacta al administrador",
//       });
//     }

//     // Verificar contraseña
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json(invalidMsg);

//     // Generar token de sesión (sin expiración corta)
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         error: true,
//         msg: "Error de configuración del servidor",
//       });
//     }

//     const payload = { id: user.id, email: user.email };
//     // Token de larga duración (30 días) o sin expiración
//     const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "30d", // Puedes usar "365d" o incluso omitir expiresIn
//     });

//     // Guardar hash del token en DB para poder revocarlo
//     const tokenHash = await bcrypt.hash(sessionToken, 10);
//     user.refreshTokenHash = tokenHash;
//     await user.save();

//     res.json({
//       error: false,
//       msg: "Login exitoso",
//       token: sessionToken,
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         avatarUrl: user.avatarUrl,
//       },
//     });
//   } catch (error) {
//     console.error("Error en login:", error);
//     res.status(500).json({ error: true, msg: "Error del servidor" });
//   }
// }
