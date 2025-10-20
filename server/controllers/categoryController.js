import { sequelize } from "../config/db.js";
import { catchErrors, handleValidationErrors } from "../services/validationServices.js";

export const createCategory = async (req, res) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { name, anon_id } = req.body;

    await sequelize.query("INSERT INTO categories (name, user_id) VALUES (:name, :user_id)", { replacements: { name, user_id: anon_id } });

    res.status(201).json({ error: false, msg: "Categoría creada exitosamente" });
  } catch (e) {
    catchErrors(res, e);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await sequelize.query("SELECT * FROM categories WHERE user_id = :user_id", {
      replacements: { user_id: req.body.anon_id },
    });

    if (categories.length < 1) return res.status(404).json({ error: true, msg: "No se crearon categorías aún" });

    return res.json({ categories });
  } catch (e) {
    catchErrors(res, e);
  }
};
