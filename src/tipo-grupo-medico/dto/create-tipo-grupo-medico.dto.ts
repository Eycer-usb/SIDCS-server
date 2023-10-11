import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoGrupoMedicoDto {
    @IsNotEmpty()
    @IsString()
    descripcion: string;
}
