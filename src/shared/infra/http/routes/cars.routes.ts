import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";


const carsRoutes = Router();

carsRoutes.use(ensureAuthenticated);
carsRoutes.post("/", new CreateCarController().handle);

export { carsRoutes };

