import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';

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
}