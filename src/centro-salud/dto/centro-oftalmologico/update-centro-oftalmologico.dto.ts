import { CreateCentroOftalmologicoDto } from './create-centro-oftalmologico.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCentroOftalmologicoDto extends PartialType(CreateCentroOftalmologicoDto) {}