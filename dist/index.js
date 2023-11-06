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
const express = __importStar(require("express"));
const config_1 = __importDefault(require("./config"));
const loaders_1 = __importDefault(require("./loaders"));
async function main() {
    const app = express.default();
    await (0, loaders_1.default)(app);
    app.listen(config_1.default.port, () => {
        console.log(`Server is listening on port ${config_1.default.port}`);
    });
    // graceful shutdown
    process.on("SIGTERM", () => {
        console.log("SIGTERM signal received.");
        console.log("Express app closed.");
        process.exit(0);
    });
    // app.listen(config.port, '0.0.0.0', (err: any) => {
    //   if (err) {
    //     console.log(err);
    //     process.exit(1);
    //     return;
    //   }
    //   console.log(`Server listening on port: ${config.port}`);
    // });
}
main();
//# sourceMappingURL=index.js.map