"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
require("reflect-metadata");
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const error_middleware_1 = require("./middleware/error.middleware");
const responseRoutes_1 = tslib_1.__importDefault(require("./routes/responseRoutes"));
const surveyRoutes_1 = tslib_1.__importDefault(require("./routes/surveyRoutes"));
const userRoutes_1 = tslib_1.__importDefault(require("./routes/userRoutes"));
dotenv.config({ path: '../.env' });
const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const app = (0, express_1.default)();
app.use(error_middleware_1.ErrorMiddleware);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/', surveyRoutes_1.default);
app.use('/', userRoutes_1.default);
app.use('/', responseRoutes_1.default);
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Survey API Documentation',
        version: '1.0.0',
        description: 'APIs for creating and responding to surveys',
    },
    servers: [
        {
            url: 'http://localhost/',
            description: 'Local server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['swagger.yaml'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
mongoose_1.default.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.default = app;
//# sourceMappingURL=app.js.map