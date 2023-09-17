import { Delete } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' ,length: 500 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    lastname: string;

    @Column({ type: 'varchar', length: 500 })
    email: string;

    @Column({ type: 'varchar', length: 500 })
    password: string;

    @Column({ type: 'varchar', length: 500 })
    role: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;


}
