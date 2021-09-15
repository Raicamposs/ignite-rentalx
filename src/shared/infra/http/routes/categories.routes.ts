import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../../../../config/upload";



const upload = multer(uploadConfig.upload('./tmp'));

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post("/", new CreateCategoryController().handle);
categoriesRoutes.get("/", new ListCategoriesController().handle);
categoriesRoutes.post("/import", upload.single("file"), new ImportCategoryController().handle);

export { categoriesRoutes };

