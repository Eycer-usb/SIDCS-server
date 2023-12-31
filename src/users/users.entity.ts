import { Delete } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' ,length: 500 })
    name: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    lastname?: string;

    @Column({ type: 'varchar', length: 500, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 500 })
    password?: string;

    @Column({ type: 'varchar', length: 500, default: 'user' })
    role: string;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column({ type: 'integer', nullable: true })
    verification_code?: number;

    @Column({ type: 'timestamp', nullable: true })
    verification_code_expires_at?: Date;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;


}
