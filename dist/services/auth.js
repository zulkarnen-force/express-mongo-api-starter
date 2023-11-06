"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2 = __importStar(require("argon2"));
const crypto_1 = require("crypto");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const Exception_1 = require("../Exception");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async SignUp(inputUser) {
        try {
            const salt = (0, crypto_1.randomBytes)(32);
            /**
             * Hash password first
             */
            const hashedPassword = await argon2.hash(inputUser.password, { salt });
            const userRecord = await this.userRepository.create(Object.assign(Object.assign({}, inputUser), { salt: salt.toString("hex"), password: hashedPassword }));
            const token = this.generateToken(userRecord);
            if (!userRecord) {
                throw new Error("User cannot be created");
            }
            //   await this.mailer.SendWelcomeEmail(userRecord);
            /**
             * @TODO This is not the best way to deal with this
             * There should exist a 'Mapper' layer
             * that transforms data from layer to layer
             */
            const user = userRecord;
            Reflect.deleteProperty(user, "password");
            Reflect.deleteProperty(user, "salt");
            return { user, token };
        }
        catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                // Duplicate username
                throw new Error("User already exist!");
            }
            console.log(error);
            throw error;
        }
    }
    async SignIn(email, password) {
        const record = await this.userRepository.findOne({ email });
        if (!record) {
            throw new Exception_1.Exception("User not found!", 404);
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */
        const validPassword = await argon2.verify(record.password, password);
        if (validPassword) {
            const token = this.generateToken(record);
            const user = record;
            Reflect.deleteProperty(user, "password");
            Reflect.deleteProperty(user, "salt");
            /**
             * Return user and token
             */
            return { user, token };
        }
        else {
            throw new Error("Invalid Password");
        }
    }
    generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign({
            id: user.id,
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
        }, config_1.default.jwtSecret);
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map