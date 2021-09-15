import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";


const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", new CreateSpecificationController().handle);
specificationsRoutes.get("/", new ListSpecificationsController().handle);

export { specificationsRoutes };

