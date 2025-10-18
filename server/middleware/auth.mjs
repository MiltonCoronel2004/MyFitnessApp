// middleware/auth.mjs
import jwt from "jsonwebtoken";
import { User } from "../models/User.mjs";
import bcrypt from "bcrypt";

export const authenticate = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: true, 
        msg: 'Token requerido' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ 
        error: true, 
        msg: 'Token inválido o expirado' 
      });
    }

    // Buscar usuario y verificar que el token no esté revocado
    const user = await User.findByPk(decoded.id);
    
    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({ 
        error: true, 
        msg: 'Sesión inválida' 
      });
    }

    // Verificar que el token coincida con el almacenado (no revocado)
    const matches = await bcrypt.compare(token, user.refreshTokenHash);
    if (!matches) {
      return res.status(401).json({ 
        error: true, 
        msg: 'Sesión revocada' 
      });
    }

    // Verificar que la cuenta esté activa
    if (!user.isActive) {
      return res.status(403).json({ 
        error: true, 
        msg: 'Cuenta inactiva' 
      });
    }

    // Agregar usuario al request
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName
    };

    next();
  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(500).json({ 
      error: true, 
      msg: 'Error del servidor' 
    });
  }
};