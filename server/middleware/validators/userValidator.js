import { body } from "express-validator";
import { findUserByEmail } from "../../services/userServices.js";

export const registerValidator = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El formato del email no es válido.")
    .isLength({ min: 5, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres.")
    .custom(async (email) => {
      const user = await findUserByEmail(email);
      if (user) throw new Error("El email ya está registrado.");

      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
];
