import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalUseCaseController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, new CreateRentalController().handle);


export { rentalsRoutes };

