import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateSpecificationCarController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

const uploadImages = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.get("/available", new ListAvailableCarsController().handle);
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, new CreateCarController().handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, new CreateSpecificationCarController().handle);

carsRoutes.post("/images/:id",
  ensureAuthenticated, ensureAdmin,
  uploadImages.array('images'),
  new UploadCarImagesController().handle
);

export { carsRoutes };

