"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const user_dto_1 = require("../dtos/user.dto");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
router.post('/api/users', (0, validation_middleware_1.ValidationMiddleware)(user_dto_1.CreateUserDTO), userController_1.addUser);
router.get('/api/users', userController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map