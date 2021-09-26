import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const rentalsRoutes = Router();

rentalsRoutes.get("/", ensureAuthenticated, new ListRentalsByUserController().handle);
rentalsRoutes.post("/", ensureAuthenticated, new CreateRentalController().handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated, new DevolutionRentalController().handle);


export { rentalsRoutes };

