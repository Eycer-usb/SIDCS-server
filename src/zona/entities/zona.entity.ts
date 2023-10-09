import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zona {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' ,length: 500 })
    descripcion: string;

}
