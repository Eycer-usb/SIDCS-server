export class CreateUserDto {
    name: string;
    lastname?: string;
    email: string;
    role: string;
    password: string;
}