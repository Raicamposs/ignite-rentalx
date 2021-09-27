import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";


const passwordRoutes = Router();

passwordRoutes.post("/forgot", new SendForgotPasswordMailController().handle);
passwordRoutes.post("/reset", new ResetPasswordUserController().handle);

export { passwordRoutes };

