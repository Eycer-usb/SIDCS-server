import { IsCurrency, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

const digits = [1, 2, 3];
export class CreateCentroOdontologicoDto {
    @IsNotEmpty()
    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralDesde: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralHasta?: number;

    @IsOptional()
    @IsBoolean()
    ortodoncia?: boolean;

    @IsOptional()
    @IsBoolean()
    endodoncia?: boolean;

    @IsOptional()
    @IsBoolean()
    cirugiaBucal?: boolean;

    @IsOptional()
    @IsBoolean()
    protesis?: boolean;

    @IsOptional()
    @IsBoolean()
    rayosX?: boolean;
}