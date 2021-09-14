

import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface Request {
  pathFile: string,
  userId: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) { }

  async execute({ userId, pathFile }: Request): Promise<void> {
    try {
      const user = await this.usersRepository.findById(userId);
      const oldAvatar = user.avatar;
      user.avatar = `./tmp/avatar/${pathFile}`;
      await this.usersRepository.create(user);

      if (oldAvatar)
        await deleteFile(oldAvatar);

    } catch (error) {
      await deleteFile(pathFile);
    }
  }
}

export { UpdateUserAvatarUseCase };

