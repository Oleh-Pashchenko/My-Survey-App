"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const responseController_1 = require("../controllers/responseController");
const surveyResponse_dto_1 = require("../dtos/surveyResponse.dto");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
router.post('/api/responses/:surveyId', (0, validation_middleware_1.ValidationMiddleware)(surveyResponse_dto_1.SurveyResponseDTO), responseController_1.submitResponse);
router.get('/api/responses/:surveyId/user/:userId', responseController_1.getUserResponsesBySurvey);
router.get('/api/responses/user/:userId', responseController_1.getUserResponsesByUserId);
exports.default = router;
//# sourceMappingURL=responseRoutes.js.map