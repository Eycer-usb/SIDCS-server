import { Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class CentroSalud {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;
    
    @Column({ type: 'text' })
    direccion: string;
    
    @Column({ type: 'decimal', precision: 10, scale: 8 })
    latitud: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    longitud: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    telefono: string;

    @Column({ type: 'int' })
    tamano: number;

    @Column({ type: 'int' })
    limpieza: number;

    @Column({ type: 'int' })
    demanda: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deletedAt: Date;

}
