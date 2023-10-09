import { IsNotEmpty, IsString } from "class-validator";

export class CreateZonaDto {
    @IsNotEmpty()
    @IsString()
    descripcion: string;
}
