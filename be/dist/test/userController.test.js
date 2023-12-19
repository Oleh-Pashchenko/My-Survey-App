"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
describe('Users Controller', () => {
    describe('POST /Users', () => {
        it('should create a new user', async () => {
            const newUser = {
                name: 'Oleh',
            };
            const response = await (0, supertest_1.default)(app_1.default).post('/api/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body.name).toEqual(newUser.name);
        });
    });
    afterAll(async (done) => {
        for (const modelKey in mongoose_1.default.connection.models) {
            const model = mongoose_1.default.connection.models[modelKey];
            await model.deleteMany();
        }
        mongoose_1.default.connection.close(done);
    });
});
//# sourceMappingURL=userController.test.js.map