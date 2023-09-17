import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        return await this.usersService.create(createUserDto);
    }
}