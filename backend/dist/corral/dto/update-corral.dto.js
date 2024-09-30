"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCorralDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_corral_dto_1 = require("./create-corral.dto");
class UpdateCorralDto extends (0, mapped_types_1.PartialType)(create_corral_dto_1.CrearCorralDto) {
}
exports.UpdateCorralDto = UpdateCorralDto;
//# sourceMappingURL=update-corral.dto.js.map