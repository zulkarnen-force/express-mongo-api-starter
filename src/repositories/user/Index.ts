import { ObjectId } from "mongodb";
import _ from "lodash";
import { Model } from "mongoose";
import IUserRepository from "./UserRepository";
import User from "../../models/user/User";
import UserModel from "../../models/user/UserMongo";
import UserRepository from "./UserRepository";

class UserMongoRepository implements UserRepository {
  private readonly userModel: Model<User>;
  constructor() {
    this.userModel = UserModel;
  }
  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async find(query: any): Promise<User[] | null> {
    try {
      return await UserModel.find(query);
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error: any) {
      throw new Error(`Error getting User by ID: ${error.message}`);
    }
  }

  async findOne(query: any): Promise<User | null> {
    try {
      return await this.userModel.findOne(query).exec();
    } catch (error: any) {
      throw new Error(`Error getting User by ID: ${error.message}`);
    }
  }

  // Create a new User
  async create(UserData: Partial<User>): Promise<User> {
    try {
      const newUser = new this.userModel(UserData);
      return await newUser.save();
    } catch (error: any) {
      throw new Error(`Error creating User: ${error.message}`);
    }
  }

  // Update an existing User by ID
  async updateById(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate({ _id: new ObjectId(id) }, updateData, { new: true })
        .exec();
    } catch (error: any) {
      throw new Error(`Error updating User by ID: ${error.message}`);
    }
  }

  // Get Users by patient ID and code
  async getByPatientAndCode(patientId: string, code: string): Promise<User[]> {
    const searchCriteria = {
      $and: [
        {
          "code.coding": {
            $elemMatch: {
              code: code,
            },
          },
        },
        { "patient.reference": `Patient/${patientId}` },
      ],
    };
    try {
      return await this.userModel.find(searchCriteria).exec();
    } catch (error: any) {
      throw new Error(
        `Error getting Users by patient ID and code: ${error.message}`
      );
    }
  }
}

export default UserMongoRepository;
