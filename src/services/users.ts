import { Service } from "typedi";
import User from "../models/user/User";
import UserRepository from "../repositories/user/UserRepository";

@Service()
export default class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  public async findOne(options: any): Promise<User> {
    return await this.userRepository.findOne(options);
  }
}
