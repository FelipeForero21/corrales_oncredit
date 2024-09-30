"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorralModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const corral_service_1 = require("./corral.service");
const corral_controller_1 = require("./corral.controller");
const corral_entity_1 = require("./entities/corral.entity");
const animal_entity_1 = require("../animal/entities/animal.entity");
let CorralModule = class CorralModule {
};
exports.CorralModule = CorralModule;
exports.CorralModule = CorralModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([corral_entity_1.Corral, animal_entity_1.Animal])],
        providers: [corral_service_1.CorralService],
        controllers: [corral_controller_1.CorralController],
    })
], CorralModule);
//# sourceMappingURL=corral.module.js.map