"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
exports.default = async (app) => {
    const connection = await (0, database_1.default)();
    console.log("DB loaded and connected!");
    await (0, server_1.default)(app);
    console.log("Server loaded!");
};
//# sourceMappingURL=index.js.map