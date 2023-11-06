import User from "../../models/user/User";

interface UserRepository {
  find(query: any): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  findOne(email: any): Promise<User | null>;
  // create(user: Partial<User>): Promise<User>;
  create(user: any): Promise<User>;
}

export default UserRepository;
