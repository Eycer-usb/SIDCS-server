import { IsNotEmpty, IsInt, Min, IsCurrency, IsIn, Max, IsOptional } from 'class-validator';

const digits = [1, 2, 3];

export class CreateClinicaPrivadaDto {
    @IsInt()
    @Min(1)
    @Max(3)
    @IsNotEmpty()
    emergencia: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    medicinaGeneral?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    medicinaInterna?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    pediatria?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    ginecologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    obstetricia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    cardiologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    rayosXDeTorax?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    tomografiaAbdominalPelvica?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    resonanciaCerebral?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    ecoAbdominal?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    mamografia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    densitometriaOsea?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    hematologiaCompleta?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    perfil20?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    perfilTiroideo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    urocultivo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    heces?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    orina?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    perfilPreoperatorio?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    apendicectomia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    colicistectomiaLamparoscopica?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    herniorrafiaIngiunal?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    cesarea?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    partoNormal?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: digits })
    hospitalizacion?: number;

}
