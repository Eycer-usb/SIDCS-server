import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroSaludDto } from './create-centro-salud.dto';

export class UpdateCentroSaludDto extends PartialType(CreateCentroSaludDto) {}
