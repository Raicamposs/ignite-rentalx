import { Router } from "express";

import { CategoriesRepository } from "../repositories/categories_repository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).send({ error: "Category Already exists!" });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (_, response) => {
  return response.json(categoriesRepository.list());
});

export { categoriesRoutes };
