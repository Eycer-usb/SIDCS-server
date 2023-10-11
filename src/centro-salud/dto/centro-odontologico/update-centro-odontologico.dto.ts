import { CreateCentroOdontologicoDto } from './create-centro-odontologico.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCentroOdontologicoDto extends PartialType(CreateCentroOdontologicoDto) {}