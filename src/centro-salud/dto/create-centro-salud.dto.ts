import { IsNotEmpty, IsString, IsNumber, IsPhoneNumber, Min, Max, IsLongitude, IsLatitude, IsInt } from 'class-validator';

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
    @IsLatitude()
    latitud: number;
    
    @IsNotEmpty()
    @IsPhoneNumber('VE')
    telefono: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(3)
    tamaño: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(3)
    limpieza: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(3)
    demanda: number;
    
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    idLocalidad: number;    
}
