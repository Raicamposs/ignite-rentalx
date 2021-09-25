import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateSpecificationCarController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const carsRoutes = Router();
carsRoutes.get("/available", new ListAvailableCarsController().handle);
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, new CreateCarController().handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, new CreateSpecificationCarController().handle);

export { carsRoutes };

