"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
require("reflect-metadata");
const app_1 = tslib_1.__importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const port = process.env.BE_PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
process.on('unhandledRejection', (error) => {
    throw error;
});
process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});
exports.default = server;
//# sourceMappingURL=server.js.map