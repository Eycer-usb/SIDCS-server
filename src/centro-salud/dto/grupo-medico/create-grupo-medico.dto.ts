import { CreateCentroSaludDto } from '../create-centro-salud.dto';
import { IsNotEmpty, IsCurrency, IsInt, Min } from 'class-validator';
const decimals = [0, 1, 2];
export class CreateGrupoMedicoDto extends CreateCentroSaludDto {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    tipoId: number;

    @IsCurrency({ digits_after_decimal: decimals })
    medicinaGeneral?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    medicinaInterna?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    pediatria?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    ginecologia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    obstetricia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    cardiologia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    gastro?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    neurologia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    neumonologia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    medicinaFyR?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    psiquiatra?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    psicologia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    rayosXDeTorax?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    tomografiaAbdominalPelvica?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    resonanciaCerebral?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    ecoAbdominal?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    mamografia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    densitometriaOsea?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    epirometria?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    eeg?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    lamparoscopia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    pruebaDeEsfuerzoCardio?: number;


    @IsCurrency({ digits_after_decimal: decimals })
    hematologiaCompleta?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    perfil20?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    perfilTiroideo?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    urocultivo?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    heces?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    orina?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    perfilPreoperatorio?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    apendicectomia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    colicistectomia?: number;

    @IsCurrency({ digits_after_decimal: decimals })
    herniorrafiaIngiunal?: number;

    @IsCurrency( { digits_after_decimal: decimals } )
    cesarea?: number;

    @IsCurrency( { digits_after_decimal: decimals } )
    partoNormal?: number;

    @IsCurrency( { digits_after_decimal: decimals } )
    hospitalizacion?: number;

}