import { body } from "express-validator";
import { findCategoryByName } from "../../services/categoryServices.js";

export const createValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom(async (name) => {
      const category = await findCategoryByName(name.trim());
      if (category) throw new Error("La categoría ya existe");

      return true;
    }),
];
