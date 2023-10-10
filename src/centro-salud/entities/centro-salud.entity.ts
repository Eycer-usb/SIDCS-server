import { Localidad } from '../../localidad/entities/localidad.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Zona } from 'src/zona/entities/zona.entity';

export abstract class CentroSalud {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;
    
    @Column({ type: 'text' })
    direccion: string;
    
    @Column({ type: 'varchar', length: 100 })
    ubicacion: string;

    @Column({ type: 'varchar', length: 11 })
    telefono: string;

    @Column({ type: 'int' })
    tamaño: number;

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
