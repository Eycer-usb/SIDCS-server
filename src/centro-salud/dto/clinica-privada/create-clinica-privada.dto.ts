import { IsNotEmpty, IsInt, Min, IsCurrency, IsIn, Max } from 'class-validator';

const digits = [1, 2, 3];

export class CreateClinicaPrivadaDto {
    @IsInt()
    @Min(1)
    @Max(3)
    @IsNotEmpty()
    emergencia: number;

    @IsCurrency({ digits_after_decimal: digits })
    medicinaGeneral?: number;

    @IsCurrency({ digits_after_decimal: digits })
    medicinaInterna?: number;

    @IsCurrency({ digits_after_decimal: digits })
    pediatria?: number;

    @IsCurrency({ digits_after_decimal: digits })
    ginecologia?: number;

    @IsCurrency({ digits_after_decimal: digits })
    obstetricia?: number;

    @IsCurrency({ digits_after_decimal: digits })
    cardiologia?: number;

    @IsCurrency({ digits_after_decimal: digits })
    rayosXDeTorax?: number;

    @IsCurrency({ digits_after_decimal: digits })
    tomografiaAbdominalPelvica?: number;

    @IsCurrency({ digits_after_decimal: digits })
    resonanciaCerebral?: number;

    @IsCurrency({ digits_after_decimal: digits })
    ecoAbdominal?: number;

    @IsCurrency({ digits_after_decimal: digits })
    mamografia?: number;

    @IsCurrency({ digits_after_decimal: digits })
    densitometriaOsea?: number;

    @IsCurrency({ digits_after_decimal: digits })
    hematologiaCompleta?: number;

    @IsCurrency({ digits_after_decimal: digits })
    perfil20?: number;

    @IsCurrency({ digits_after_decimal: digits })
    perfilTiroideo?: number;

    @IsCurrency({ digits_after_decimal: digits })
    urocultivo?: number;

    @IsCurrency({ digits_after_decimal: digits })
    heces?: number;

    @IsCurrency({ digits_after_decimal: digits })
    orina?: number;

    @IsCurrency({ digits_after_decimal: digits })
    perfilPreoperatorio?: number;

    @IsCurrency({ digits_after_decimal: digits })
    apendicectomia?: number;

    @IsCurrency({ digits_after_decimal: digits })
    colicistectomiaLamparoscopica?: number;

    @IsCurrency({ digits_after_decimal: digits })
    herniorrafiaIngiunal?: number;

    @IsCurrency({ digits_after_decimal: digits })
    cesarea?: number;

    @IsCurrency({ digits_after_decimal: digits })
    partoNormal?: number;

    @IsCurrency({ digits_after_decimal: digits })
    hospitalizacion?: number;

}
