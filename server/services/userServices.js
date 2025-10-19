import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [user] = await sequelize.query("SELECT * FROM users WHERE email = :email LIMIT 1", {
    replacements: { email },
    type: QueryTypes.SELECT,
  });

  return user;
};

export const findUserById = async (user_id) => {
  const [user] = sequelize.query("SELECT * FROM users WHERE id = :id LIMIT 1", {
    replacements: { id: user_id },
    type: QueryTypes.SELECT,
  });

  return user;
};
