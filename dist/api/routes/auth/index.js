"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../services/auth"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const Index_1 = __importDefault(require("../../../repositories/user/Index"));
const route = (0, express_1.Router)();
// @TODO Make Routes like this
// export class AuthRoutes {
//   constructor(@Inject(AuthService) private authService: AuthService) {}
// }
let authService = new auth_1.default(new Index_1.default());
exports.default = (app) => {
    app.use("/auth", route);
    route.post("/register", (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            name: celebrate_1.Joi.string().alphanum().min(2).max(30).required(),
            email: celebrate_1.Joi.string().required().email(),
            password: celebrate_1.Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .required()
                .min(8),
            repeat_password: celebrate_1.Joi.ref("password"),
            age: celebrate_1.Joi.number().integer().required().min(18),
            about: celebrate_1.Joi.string().min(2).max(30),
        }),
    }), async (req, res, next) => {
        try {
            const authServiceInstance = authService;
            const { user, token } = await authServiceInstance.SignUp(req.body);
            return res.json({ user, token }).status(201);
        }
        catch (e) {
            console.log(" error ", e);
            return next(e);
        }
    });
    route.post("/login", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().trim().email().required(),
            password: celebrate_1.Joi.string().min(8).max(30).required(),
        }),
    }), async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const authServiceInstance = authService;
            const { user, token } = await authServiceInstance.SignIn(email, password);
            return res.json({ user, token }).status(200);
        }
        catch (e) {
            console.log(" error ", e);
            return next(e);
        }
    });
    route.post("/logout", middlewares_1.default.isAuth, async (req, res, next) => {
        try {
            // @TODO AuthService.Logout(req.user) for doing some other stuffff
            return res.status(200).end();
        }
        catch (e) {
            console.log(" error ", e);
            return next(e);
        }
    });
};
//# sourceMappingURL=index.js.map