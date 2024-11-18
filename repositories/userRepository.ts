import { User } from "../models/user";
import { BaseRepository } from "../repositories/base";
import { UserRepositoryI } from "../interface/repositoriesI/userRepositoryI";

class UserRepository extends BaseRepository<User> implements UserRepositoryI {
    constructor(db: any) {
      super(db.users); 
    }
  
    async findUserByEmail(email: string): Promise<User | null> {
      return this.findOne({ email });
    }
  }

export default UserRepository;
