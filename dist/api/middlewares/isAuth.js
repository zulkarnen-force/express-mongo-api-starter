"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const config_1 = __importDefault(require("../../config"));
/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 */
const getTokenFromHeader = (req) => {
    const { authorization } = req.headers;
    if ((authorization && authorization.split(' ')[0] === 'Token') ||
        (authorization && authorization.split(' ')[0] === 'Bearer')) {
        return authorization.split(' ')[1];
    }
    // tslint:disable-next-line: no-null-keyword
    return null;
};
const isAuth = (0, express_jwt_1.expressjwt)({
    algorithms: ['HS256'],
    secret: config_1.default.jwtSecret,
    getToken: getTokenFromHeader, // How to extract the JWT from the request
});
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map