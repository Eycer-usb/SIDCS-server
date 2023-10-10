import { CreateCentroSaludDto } from '../create-centro-salud.dto';
import { IsNotEmpty, IsCurrency } from 'class-validator';
export class CreateLaboratorioClinicoDto extends CreateCentroSaludDto {
    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    hematologia_completa: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    perfil_20: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    perfil_tiroideo: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    urocultivo: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    heces: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    orina: number;

    @IsCurrency({ digits_after_decimal: [0, 1, 2] })
    @IsNotEmpty()
    perfil_preoperatorio: number;
}