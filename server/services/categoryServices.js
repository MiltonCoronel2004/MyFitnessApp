import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const findCategoryByName = async (category_name) => {
  const [category] = await sequelize.query("SELECT * FROM categories WHERE name = :name", {
    replacements: { name: category_name },
    type: QueryTypes.SELECT,
  });

  return category;
};
