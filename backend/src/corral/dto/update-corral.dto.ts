import { PartialType } from '@nestjs/mapped-types';
import { CrearCorralDto } from './create-corral.dto';

export class UpdateCorralDto extends PartialType(CrearCorralDto) {}
