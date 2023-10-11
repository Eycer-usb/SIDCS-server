import { CreateClinicaPrivadaDto } from './create-clinica-privada.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateClinicaPrivadaDto extends PartialType(CreateClinicaPrivadaDto) {}