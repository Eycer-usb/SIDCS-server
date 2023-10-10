import { IsNotEmpty, IsString, IsNumber, IsPhoneNumber, Min, Max, IsLongitude } from 'class-validator';

export class CreateCentroSaludDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    direccion: string;

    @IsNotEmpty()
    @IsLongitude()
    longitud: number;

    @IsNotEmpty()
    @IsLongitude()
    latitud: number;
    
    @IsNotEmpty()
    @IsPhoneNumber('VE')
    telefono: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @Min(1)
    @Max(3)
    tamaño: number;

    @IsNotEmpty()
    @Min(1)
    @Max(3)
    limpieza: number;

    @IsNotEmpty()
    @Min(1)
    @Max(3)
    demanda: number;
    
    @IsNotEmpty()
    @IsNumber()
    idLocalidad: number;    
}
