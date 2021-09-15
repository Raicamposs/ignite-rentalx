import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateAvatarUser/UpdateUserAvatarController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../../../../config/upload";


const usersRoutes = Router();


const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));


usersRoutes.post("/", new CreateUserController().handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single('avatar'),
  new UpdateUserAvatarController().handle
);


export { usersRoutes };

