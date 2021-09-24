import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const upload = multer(uploadConfig.upload('./tmp'));

const categoriesRoutes = Router();

categoriesRoutes.get("/", new ListCategoriesController().handle);
categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, new CreateCategoryController().handle);
categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), new ImportCategoryController().handle);

export { categoriesRoutes };

