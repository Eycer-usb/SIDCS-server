import { CentroOdontologico } from 'src/centro-salud/entities/centro-odontologico.entity';
import { CentroSalud } from 'src/centro-salud/entities/centro-salud.entity';
import { ClinicaPrivada } from 'src/centro-salud/entities/clinica-privada.entity';
import { GrupoMedico } from 'src/centro-salud/entities/grupo-medico.entity';
import { LaboratorioClinico } from 'src/centro-salud/entities/laboratorio-clinico.entity';
import { Zona } from 'src/zona/entities/zona.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Localidad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Zona, zona => zona.localidades)
    zonas: Zona[];

    @OneToMany(() => LaboratorioClinico, laboratorioClinico => laboratorioClinico.localidad)
    laboratoriosClinicos: LaboratorioClinico[];
    
    @OneToMany(() => CentroOdontologico, centro => centro.localidad)
    centrosOdontologicos: CentroOdontologico[];

    @OneToMany(() => ClinicaPrivada, centro => centro.localidad)
    clinicasPrivadas: ClinicaPrivada[];

    @OneToMany(() => GrupoMedico, centro => centro.localidad)
    gruposMedicos: GrupoMedico[];

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    descripcion: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deletedAt: Date;
}
