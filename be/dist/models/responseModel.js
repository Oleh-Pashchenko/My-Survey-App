"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResponseModel = void 0;
const mongoose_1 = require("mongoose");
const surveyResponseSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    survey: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Survey' },
    answers: [
        {
            questionId: String,
            selectedOptionIndex: Number,
        },
    ],
});
exports.SurveyResponseModel = (0, mongoose_1.model)('SurveyResponse', surveyResponseSchema);
//# sourceMappingURL=responseModel.js.map