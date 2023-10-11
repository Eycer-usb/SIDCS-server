import { GrupoMedico } from 'src/centro-salud/entities/grupo-medico.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TipoGrupoMedico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' ,length: 500 })
    descripcion: string;

    @OneToMany(() => GrupoMedico, centro => centro.tipo)
    gruposMedicos: GrupoMedico[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

}
