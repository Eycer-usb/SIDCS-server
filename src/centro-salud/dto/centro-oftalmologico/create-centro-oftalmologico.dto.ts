import { IsBoolean, IsCurrency, IsNotEmpty } from "class-validator";

const digits = [1, 2, 3];

export class CreateCentroOftalmologicoDto {
    @IsNotEmpty()
    @IsCurrency({ digits_after_decimal: digits })
    oftalmologiaGeneralDesde: number;

    @IsCurrency({ digits_after_decimal: digits })
    oftalmologiaGeneralHasta?: number;

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
