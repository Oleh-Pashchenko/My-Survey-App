"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyDTO = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class QuestionDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], QuestionDTO.prototype, "text", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], QuestionDTO.prototype, "options", void 0);
class SurveyDTO {
}
exports.SurveyDTO = SurveyDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SurveyDTO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionDTO),
    tslib_1.__metadata("design:type", Array)
], SurveyDTO.prototype, "questions", void 0);
//# sourceMappingURL=survey.dto.js.map