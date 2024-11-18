import { BaseRepository } from "../repositoriesI/baseRepositoryI";
import { User } from "../../models/user";

export interface UserRepositoryI extends BaseRepository<User> {
  findUserByEmail(email: string): Promise<User | null>;
}
