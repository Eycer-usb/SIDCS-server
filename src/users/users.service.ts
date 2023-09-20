import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private config: ConfigService
    ) {}

    /**
     * Find a user by email address
     */
    async findByEmail(email: string): Promise<User | null> {
        if(!email) return null;
        return await this.userRepository.findOneBy({ email });
    }

    /**
     * Create a new user in the database 
     */
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

    /**
     * Delete a user from the database
     */
    async delete( id: number ): Promise<User | undefined> {
        try {
            return await this.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(`Error: ${error}}`);
        }
    }

    /**
     * Find all users in the database
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }


    /**
     * Find a user by id
     */
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({id});
    }

    /**
     * Generate a verification code for a user and save it in the database
     * with an expiration date stored in the config file 
     */
    async generateVerificationCode(user: User): Promise<number> {
        const code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        user.verification_code = code;
        user.verification_code_expires_at  = new Date(Date.now() + this.config.get("code_duration_mill"));
        await this.userRepository.save(user);
        return code;
    }

    /**
     * Verify the code sent by email to a user to verify the email address
     * and return a message if the code is valid or a exception if it is not
     */
    async verifyCode(user: User, code: number){
        const isValid = user.verification_code !== undefined &&
                        user.verification_code_expires_at !== undefined && 
                        user.verification_code_expires_at < new Date( Date.now() );

        if (user.verification_code !== code) {
            return new InternalServerErrorException("Code does not match");
        }
        else if (isValid) {
            return new InternalServerErrorException("Code expired");
        }

        return {
            statusCode: 200,
            status: "success",
            message: 'Code verified successfully'
        };
    }


    /**
     * Verify the email address of a user
     */
    async verifyEmail(email: string){
        const user = await this.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        user.verified = true;
        await this.userRepository.save(user);
        return {
            statusCode: 200,
            status: "success",
            message: 'User verified successfully'
        }
    }

    /**
     * Change the password of a user and save it in the database
     */
    async recoverPassword(user: User, password: string){
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        return {
            statusCode: 200,
            status: "success",
            message: 'Password recovered successfully'
        }
    }
}