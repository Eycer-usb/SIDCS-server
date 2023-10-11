import { IsCurrency, IsBoolean } from "class-validator";

const digits = [1, 2, 3];
export class CreateCentroOdontologicoDto {
    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralDesde: number;

    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralHasta?: number;

    @IsBoolean()
    ortodoncia?: boolean;

    @IsBoolean()
    endodoncia?: boolean;

    @IsBoolean()
    cirugiaBucal?: boolean;

    @IsBoolean()
    protesis?: boolean;

    @IsBoolean()
    rayosX?: boolean;
}