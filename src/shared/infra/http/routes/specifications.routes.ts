import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const specificationsRoutes = Router();
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, new CreateSpecificationController().handle);
specificationsRoutes.get("/", new ListSpecificationsController().handle);

export { specificationsRoutes };

