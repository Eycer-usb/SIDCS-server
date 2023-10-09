import { IsString } from "class-validator";
export class CreateZonaDto {
    @IsString()
    descripcion: string;
}
