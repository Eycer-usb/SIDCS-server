import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email });
    }

    async create( userDto: CreateUserDto ): Promise<User | undefined> {
        const emailExists = await this.findByEmail(userDto.email);
        if (emailExists) {
            throw new ConflictException(`Email ${userDto.email} already exists`);
        }

        const user = new User();
        try {
            Object.assign(user, userDto);
            user.password = await bcrypt.hash(userDto.password, 10);
            await this.userRepository.create(user)
            return await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error}`);
        }
    }

    async update( userDto: UpdateUserDto ): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({id: userDto.id});
        if (!user) {
            throw new NotFoundException("User not found on update");
        }
        try {
            return await this.update(userDto);
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error}}`);
        }
    }

    async delete( id: number ): Promise<User | undefined> {
        try {
            return await this.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error}}`);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({id});
    }

    async generateVerificationCode(user: User): Promise<number> {
        const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        user.verification_code = code;
        await this.userRepository.save(user);
        return code;
    }
}