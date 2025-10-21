import { sequelize } from "../config/db.js";
import { catchErrors, handleValidationErrors } from "../services/validationServices.js";

export const createCategory = async (req, res) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { name, anon_id } = req.body;

    await sequelize.query("INSERT INTO categories (name, anon_id) VALUES (:name, :anon_id)", { replacements: { name, anon_id } });

    res.status(201).json({ error: false, msg: "Categoría creada exitosamente" });
  } catch (e) {
    catchErrors(res, e);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const { anon_id } = req.params;
    const [categories] = await sequelize.query("SELECT * FROM categories WHERE anon_id = :anon_id", {
      replacements: { anon_id },
    });

    if (categories.length < 1) return res.status(404).json({ error: true, msg: "No se crearon categorías aún" });

    return res.json({ categories });
  } catch (e) {
    catchErrors(res, e);
  }
};
