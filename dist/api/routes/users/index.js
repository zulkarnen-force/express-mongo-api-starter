"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../../middlewares"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/users", route);
    route.get("/me", middlewares_1.default.isAuth, middlewares_1.default.attachCurrentUser, async (req, res) => {
        return res.json({ user: req.currentUser }).status(200);
    });
};
//# sourceMappingURL=index.js.map