"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const UserMongo_1 = __importDefault(require("../../models/user/UserMongo"));
class UserMongoRepository {
    constructor() {
        this.userModel = UserMongo_1.default;
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    async find(query) {
        try {
            return await UserMongo_1.default.find(query);
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            return await this.userModel.findById(id).exec();
        }
        catch (error) {
            throw new Error(`Error getting User by ID: ${error.message}`);
        }
    }
    async findOne(query) {
        try {
            return await this.userModel.findOne(query).exec();
        }
        catch (error) {
            throw new Error(`Error getting User by ID: ${error.message}`);
        }
    }
    // Create a new User
    async create(UserData) {
        try {
            const newUser = new this.userModel(UserData);
            return await newUser.save();
        }
        catch (error) {
            throw new Error(`Error creating User: ${error.message}`);
        }
    }
    // Update an existing User by ID
    async updateById(id, updateData) {
        try {
            return await this.userModel
                .findByIdAndUpdate({ _id: new mongodb_1.ObjectId(id) }, updateData, { new: true })
                .exec();
        }
        catch (error) {
            throw new Error(`Error updating User by ID: ${error.message}`);
        }
    }
    // Get Users by patient ID and code
    async getByPatientAndCode(patientId, code) {
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
        }
        catch (error) {
            throw new Error(`Error getting Users by patient ID and code: ${error.message}`);
        }
    }
}
exports.default = UserMongoRepository;
//# sourceMappingURL=Index.js.map