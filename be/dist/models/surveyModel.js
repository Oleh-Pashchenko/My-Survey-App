"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModel = void 0;
const mongoose_1 = require("mongoose");
const surveySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    questions: [
        {
            text: String,
            options: [String],
        },
    ],
});
exports.SurveyModel = (0, mongoose_1.model)('Survey', surveySchema);
//# sourceMappingURL=surveyModel.js.map