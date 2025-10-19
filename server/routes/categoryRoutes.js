import express from "express";
import { createCategory } from "../controllers/categoryController";

export const categoryRoutes = express.Router();

categoryRoutes.post("/create", createCategory);
