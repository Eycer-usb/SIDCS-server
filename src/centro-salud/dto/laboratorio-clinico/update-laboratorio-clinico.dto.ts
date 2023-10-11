import { CreateLaboratorioClinicoDto } from "./create-laboratorio-clinico.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLaboratorioClinicoDto extends PartialType(CreateLaboratorioClinicoDto) {}