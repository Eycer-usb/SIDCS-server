import { IsEmail, IsNotEmpty, IsNumber  } from "class-validator";


export class RecoveryDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    verification_code: number;

    @IsNotEmpty()
    password: string;
}