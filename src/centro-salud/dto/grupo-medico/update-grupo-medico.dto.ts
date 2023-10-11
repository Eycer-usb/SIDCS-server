import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoMedicoDto } from './create-grupo-medico.dto';

export class UpdateGrupoMedicoDto extends PartialType(CreateGrupoMedicoDto) {}