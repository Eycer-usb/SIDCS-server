import { CreateCentroSaludDto } from '../create-centro-salud.dto';
import { IsCurrency, IsOptional } from 'class-validator';
export class CreateLaboratorioClinicoDto extends CreateCentroSaludDto {
    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    hematologiaCompleta?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfil20?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfilTiroideo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    urocultivo?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    heces?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    orina?: number;

    @IsOptional()
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    perfilPreoperatorio?: number;
}