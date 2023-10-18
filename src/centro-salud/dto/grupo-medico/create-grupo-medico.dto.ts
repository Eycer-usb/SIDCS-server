import { CreateCentroSaludDto } from '../create-centro-salud.dto';
import { IsNotEmpty, IsCurrency, IsInt, Min, IsOptional } from 'class-validator';
const decimals = [0, 1, 2];
export class CreateGrupoMedicoDto extends CreateCentroSaludDto {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    tipoId: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    medicinaGeneral?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    medicinaInterna?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    pediatria?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    ginecologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    obstetricia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    cardiologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    gastro?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    neurologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    neumonologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    medicinaFyR?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    psiquiatra?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    psicologia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    rayosXDeTorax?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    tomografiaAbdominalPelvica?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    resonanciaCerebral?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    ecoAbdominal?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    mamografia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    densitometriaOsea?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    epirometria?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    eeg?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    lamparoscopia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    pruebaDeEsfuerzoCardio?: number;


    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    hematologiaCompleta?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    perfil20?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    perfilTiroideo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    urocultivo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    heces?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    orina?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    perfilPreoperatorio?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    apendicectomia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    colicistectomia?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: decimals })
    herniorrafiaIngiunal?: number;

    @IsOptional()
    @IsCurrency( { digits_after_decimal: decimals } )
    cesarea?: number;

    @IsOptional()
    @IsCurrency( { digits_after_decimal: decimals } )
    partoNormal?: number;

    @IsOptional()
    @IsCurrency( { digits_after_decimal: decimals } )
    hospitalizacion?: number;

}