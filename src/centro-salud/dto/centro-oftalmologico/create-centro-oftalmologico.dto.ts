import { IsBoolean, IsCurrency, IsNotEmpty } from "class-validator";

const digits = [1, 2, 3];

export class CreateCentroOdontologicoDto {
    @IsNotEmpty()
    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralDesde: number;

    @IsCurrency({ digits_after_decimal: digits })
    odontologiaGeneralHasta?: number;

    @IsBoolean()
    tratamientoGlaucomaCataratas?: boolean;

    @IsBoolean()
    protesisOculares?: boolean;

    @IsBoolean()
    tratamientosEspecializados?: boolean;

    @IsBoolean()
    oncologia?: boolean;

    @IsBoolean()
    otros?: boolean;
}
