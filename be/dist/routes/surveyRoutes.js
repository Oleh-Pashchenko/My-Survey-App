"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const surveyController_1 = require("../controllers/surveyController");
const survey_dto_1 = require("./../dtos/survey.dto");
const validation_middleware_1 = require("./../middleware/validation.middleware");
const router = express_1.default.Router();
router.post('/api/surveys', (0, validation_middleware_1.ValidationMiddleware)(survey_dto_1.SurveyDTO), surveyController_1.createSurvey);
router.get('/api/surveys/:surveyId/results', surveyController_1.getSurveyResults);
router.get('/api/surveys/:surveyId', surveyController_1.getSurvey);
router.get('/api/surveys', surveyController_1.getSurveys);
exports.default = router;
//# sourceMappingURL=surveyRoutes.js.map