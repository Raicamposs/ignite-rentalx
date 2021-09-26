import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, new CreateRentalController().handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated, new DevolutionRentalController().handle);


export { rentalsRoutes };

