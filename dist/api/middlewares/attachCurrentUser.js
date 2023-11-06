"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../../services/users"));
const mongodb_1 = require("mongodb");
const Index_1 = __importDefault(require("../../repositories/user/Index"));
/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    try {
        const userServiceInstance = new users_1.default(new Index_1.default());
        const userRecord = await userServiceInstance.findOne({
            _id: new mongodb_1.ObjectId(req.auth.id).toHexString(),
        });
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser = userRecord;
        Reflect.deleteProperty(currentUser, "password");
        Reflect.deleteProperty(currentUser, "salt");
        req.currentUser = currentUser;
        req.currentUser.os = req.auth.os;
        return next();
    }
    catch (e) {
        console.log(" Error attaching user to req");
        console.log(e);
        return next(e);
    }
};
exports.default = attachCurrentUser;
//# sourceMappingURL=attachCurrentUser.js.map