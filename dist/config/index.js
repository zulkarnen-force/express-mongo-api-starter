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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (!envFound) {
    // Throw generic error
    throw new Error("Couldn't find .env file");
}
exports.default = {
    /**
     *  Application port.
     */
    port: parseInt(process.env.PORT) || 3000,
    /**
     * JWT Secret
     */
    jwtSecret: process.env.JWT_SECRET,
    /**
     * MongoDB connection options.
     */
    database: {
        type: process.env.TYPEORM_CONNECTION,
        /**
         * Connection url where perform connection to.
         */
        url: process.env.TYPEORM_HOST,
        /**
         * Database host.
         */
        host: process.env.TYPEORM_HOST,
        /**
         * Database host port.
         */
        // tslint:disable-next-line: radix
        port: Number.parseInt(process.env.TYPEORM_PORT),
        /**
         * Database username.
         */
        username: process.env.TYPEORM_USERNAME,
        /**
         * Database password.
         */
        password: process.env.TYPEORM_PASSWORD,
        /**
         * Database name to connect to.
         */
        database: process.env.TYPEORM_DATABASE,
    },
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: process.env.AGENDA_CONCURRENCY,
    },
};
//# sourceMappingURL=index.js.map