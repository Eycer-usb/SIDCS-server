import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.entity';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateUser(email: string, pass: string): Promise<Partial<User> | undefined> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = await bcrypt.compare(pass, user.password!);
    if (!isMatch) {
        throw new UnauthorizedException( 'Wrong password' );
    }
    if (user && isMatch) {
        delete user['password'];
        return user;
    }
  }

  async signIn(user: Partial<User>) {

    if (!user.email) {
      throw new NotFoundException("User not found");
    }

    const storagedUser = await this.usersService.findByEmail(user.email);
    if (!storagedUser) {
      throw new NotFoundException("User not found");
    }

    if (storagedUser.verification_code === null ||
      storagedUser.verification_code !== user.verification_code) {
      throw new ConflictException("Wrong verification code");
    }
    

    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

    async register(createUserDto: CreateUserDto) {
        if (await this.usersService.create(createUserDto)) {
          return {
            statusCode: 201,
            status: "success",
            message: 'User created successfully'
          }
        };
    }

    async generateVerificationCode(email: string) {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      try {
        this.usersService.generateVerificationCode(user);
      }
      catch (error) {
        throw new InternalServerErrorException( 'Error on verification code generation' );
      }

      try {

        // TODO: Send email with verification code

        return {
          statusCode: 200,
          status: "success",
          message: 'Verification code sent successfully'
        }        
      }
      catch (error) {
        throw new InternalServerErrorException( 'Error sending verification code' );
      }
    }
}