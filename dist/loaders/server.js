"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const celebrate_1 = require("celebrate");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("../api/routes"));
exports.default = (app) => {
    app.enable('trust proxy');
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(body_parser_1.default.json());
    app.use((0, celebrate_1.errors)());
    app.use('/', routes_1.default);
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error['status'] = 404;
        next(error);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        /**
         * Handle validation error thrown by Celebrate + Joi
         */
        // if (isCelebrateError(err)) {
        //   return res.status(422).send({ message: err.message, details: err.details }).end();
        // }
        return next(err);
    });
    app.use((0, celebrate_1.errors)());
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
//# sourceMappingURL=server.js.map