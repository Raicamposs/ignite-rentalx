import { AuthenticateUserController } from "@modules/accounts/useCases/autenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRoutes = Router();
authenticateRoutes.post("/sessions", new AuthenticateUserController().handle);
authenticateRoutes.post("/refresh-token", new RefreshTokenController().handle);


export { authenticateRoutes };

