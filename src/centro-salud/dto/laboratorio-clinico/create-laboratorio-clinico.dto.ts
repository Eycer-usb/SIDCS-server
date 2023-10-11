import { CreateCentroSaludDto } from '../create-centro-salud.dto';
import { IsCurrency } from 'class-validator';
export class CreateLaboratorioClinicoDto extends CreateCentroSaludDto {
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    hematologiaCompleta?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfil20?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfilTiroideo?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    urocultivo?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    heces?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    orina?: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfilPreoperatorio?: number;
}