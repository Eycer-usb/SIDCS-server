import { Injectable, Logger } from '@nestjs/common';
import { Users } from './users.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users: Users[] = [
        {
            id: 1,
            name: 'admin',
            lastname: 'admin',
            email: 'admin@system.com',
            password: 'changeme',
            role: 'admin',
        },
        {
            id: 2,
            name: 'user',
            lastname: 'user',
            email: 'user@system.com',
            password: 'changeme',
            role: 'user',
        },
        {
            id: 3,
            name: 'guest',
            lastname: 'guest',
            email: 'guest',
            password: 'changeme',
            role: 'guest',
        }
    ];

    async findOne(email: string): Promise<Users | undefined> {
        return this.users.find(user => user.email === email);
    }

    async create(user: Users) {
        if(await this.findOne(user.email) !== undefined) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        this.users.push(user);
        return user;
    }
}