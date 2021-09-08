import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";



const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

categoriesRoutes.post("/", new CreateCategoryController().handle);
categoriesRoutes.get("/", new ListCategoriesController().handle);
categoriesRoutes.post("/import", upload.single("file"), new ImportCategoryController().handle);

export { categoriesRoutes };

