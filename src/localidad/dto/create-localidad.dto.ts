import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalidadDto {
    @IsNotEmpty()
    @IsString()
    descripcion: string;
}
