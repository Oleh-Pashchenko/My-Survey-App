"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResponseDTO = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AnswerDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], AnswerDTO.prototype, "questionId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AnswerDTO.prototype, "selectedOptionIndex", void 0);
class SurveyResponseDTO {
}
exports.SurveyResponseDTO = SurveyResponseDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], SurveyResponseDTO.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AnswerDTO),
    tslib_1.__metadata("design:type", Array)
], SurveyResponseDTO.prototype, "answers", void 0);
//# sourceMappingURL=surveyResponse.dto.js.map