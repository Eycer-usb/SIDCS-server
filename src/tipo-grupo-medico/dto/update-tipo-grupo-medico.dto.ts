import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoGrupoMedicoDto } from './create-tipo-grupo-medico.dto';

export class UpdateTipoGrupoMedicoDto extends PartialType(CreateTipoGrupoMedicoDto) {}
