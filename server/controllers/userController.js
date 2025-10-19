import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";
import { catchErrors, handleValidationErrors } from "../services/validationServices.js";
import { findUserByEmail } from "../services/userServices.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { full_name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await sequelize.query(
      `
      INSERT INTO users (full_name, email, password_hash)
      VALUES (:full_name, :email, :password_hash)
      `,
      {
        replacements: { full_name, email, password_hash: hashedPassword },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({
      msg: "Usuario registrado correctamente",
    });
  } catch (e) {
    catchErrors(res, e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: true, msg: "Email y Contraseña son Requeridos" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: true, msg: "Credenciales inválidas" });

    const isValidPass = await bcrypt.compare(password, user.password_hash);
    if (!isValidPass) return res.status(403).json({ error: true, msg: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.full_name },
    });
  } catch (e) {
    catchErrors(res, e);
  }
};

export const getUserInfo = async (req, res) => {
  console.log("hola");
  return res.json(req.authInfo);
};
