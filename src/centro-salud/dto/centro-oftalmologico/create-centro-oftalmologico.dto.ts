import { IsBoolean, IsCurrency, IsNotEmpty, IsOptional } from "class-validator";

const digits = [1, 2, 3];

export class CreateCentroOftalmologicoDto {
    @IsNotEmpty()
    @IsCurrency({ digits_after_decimal: digits })
    oftalmologiaGeneralDesde: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    oftalmologiaGeneralHasta?: number;

    @IsOptional()
    @IsBoolean()
    tratamientoGlaucomaCataratas?: boolean;

    @IsOptional()
    @IsBoolean()
    protesisOculares?: boolean;

    @IsOptional()
    @IsBoolean()
    tratamientosEspecializados?: boolean;

    @IsOptional()
    @IsBoolean()
    oncologia?: boolean;

    @IsOptional()
    @IsBoolean()
    otros?: boolean;
}
