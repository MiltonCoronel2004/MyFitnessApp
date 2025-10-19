import { sequelize } from "../config/db.js";
import { catchErrors } from "../services/validationServices.js";

export const createCategory = async (req, res) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { name } = req.body;

    await sequelize.query("INSERT INTO categories (name) VALUES (:name)", { replacements: { name } });

    res.status(201).json({ error: false, msg: "Categoría creada exitosamente" });
  } catch (e) {
    catchErrors(res, e);
  }
};
