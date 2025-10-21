import express from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController.js";
import { createValidator } from "../middleware/validators/categoryValidator.js";

export const categoryRoutes = express.Router();

categoryRoutes.post("/create", createValidator, createCategory);
categoryRoutes.get("/view/all/:anon_id", getAllCategories);
