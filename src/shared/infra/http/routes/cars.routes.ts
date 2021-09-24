import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const carsRoutes = Router();
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, new CreateCarController().handle);
carsRoutes.get("/available", new ListAvailableCarsController().handle);

export { carsRoutes };

