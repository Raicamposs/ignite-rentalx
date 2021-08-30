import { Router } from "express";

import { MemoryCategoriesRepository } from "../repositories/memory_categories_repository";
import CreateCategoryService from "../services/create_category.service";

const categoriesRoutes = Router();
const categoriesRepository = new MemoryCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  new CreateCategoryService(categoriesRepository).execute({
    name,
    description,
  });

  return response.status(201).send();
});

categoriesRoutes.get("/", (_, response) => {
  return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
