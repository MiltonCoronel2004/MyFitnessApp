import { Router } from "express";
import { User } from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const routes = Router();

// 🔐 REGISTRO
routes.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validación básica
    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: true,
        msg: "Todos los campos son requeridos",
      });
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
      return res.status(400).json({
        error: true,
        msg: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    // Hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario (Sequelize manejará el error si email ya existe)
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      error: false,
      msg: "Usuario registrado correctamente",
      userId: newUser.id,
    });
  } catch (error) {
    // Error de email duplicado
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: true,
        msg: "El email ya está registrado",
      });
    }
    // Error de validación de Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: true,
        msg: error.errors[0].message,
      });
    }
    res.status(500).json({ error: true, msg: "Error del servidor" });
  }
});

// 🔐 LOGIN
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        msg: "Email y contraseña son requeridos",
      });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { email } });

    // Mensaje genérico para evitar user enumeration
    const invalidMsg = { error: true, msg: "Credenciales inválidas" };
    if (!user) return res.status(401).json(invalidMsg);

    // Comprobar si cuenta activa
    if (!user.isActive) {
      return res.status(403).json({
        error: true,
        msg: "Cuenta inactiva. Contacta al administrador",
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json(invalidMsg);

    // Generar token de sesión (sin expiración corta)
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: true,
        msg: "Error de configuración del servidor",
      });
    }

    const payload = { id: user.id, email: user.email };
    // Token de larga duración (30 días) o sin expiración
    const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d", // Puedes usar "365d" o incluso omitir expiresIn
    });

    // Guardar hash del token en DB para poder revocarlo
    const tokenHash = await bcrypt.hash(sessionToken, 10);
    user.refreshTokenHash = tokenHash;
    await user.save();

    res.json({
      error: false,
      msg: "Login exitoso",
      token: sessionToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: true, msg: "Error del servidor" });
  }
});

// 🔍 VERIFICAR TOKEN (para validar sesión)
routes.post("/verify", async (req, res) => {
  try {
    const { token, userId } = req.body;

    if (!token || !userId) {
      return res.status(400).json({
        error: true,
        msg: "Token y userId son requeridos",
      });
    }

    // Verificar que el token sea válido (JWT)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        error: true,
        msg: "Token inválido o expirado",
      });
    }

    // Buscar usuario
    const user = await User.findByPk(userId);

    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({
        error: true,
        msg: "Sesión inválida",
      });
    }

    // Verificar que el token no haya sido revocado (comparar hash)
    const matches = await bcrypt.compare(token, user.refreshTokenHash);
    if (!matches) {
      return res.status(401).json({
        error: true,
        msg: "Sesión revocada o inválida",
      });
    }

    // Verificar que cuenta siga activa
    if (!user.isActive) {
      return res.status(403).json({
        error: true,
        msg: "Cuenta inactiva",
      });
    }

    res.json({
      error: false,
      msg: "Sesión válida",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error en verify:", error);
    res.status(500).json({ error: true, msg: "Error del servidor" });
  }
});

// 🚪 LOGOUT
routes.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: true,
        msg: "userId requerido",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(200).json({
        error: false,
        msg: "Sesión cerrada",
      });
    }

    // Revocar token
    user.refreshTokenHash = null;
    await user.save();

    res.json({
      error: false,
      msg: "Logout exitoso",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ error: true, msg: "Error del servidor" });
  }
});