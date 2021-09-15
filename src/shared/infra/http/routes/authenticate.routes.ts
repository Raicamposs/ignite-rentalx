import { AuthenticateUserController } from "@modules/accounts/useCases/autenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRoutes = Router();
authenticateRoutes.post("/sessions", new AuthenticateUserController().handle);


export { authenticateRoutes };

