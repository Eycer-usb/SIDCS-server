import { CentroOdontologico } from 'src/centro-salud/entities/centro-odontologico.entity';
import { CentroOftalmologico } from 'src/centro-salud/entities/centro-oftalmologico.entity';
import { CentroSalud } from 'src/centro-salud/entities/centro-salud.entity';
import { ClinicaPrivada } from 'src/centro-salud/entities/clinica-privada.entity';
import { GrupoMedico } from 'src/centro-salud/entities/grupo-medico.entity';
import { LaboratorioClinico } from 'src/centro-salud/entities/laboratorio-clinico.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Zona {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' ,length: 500 })
    descripcion: string;

    @ManyToMany(() => Localidad, localidad => localidad.zonas)
    @JoinTable( { name: 'zona_localidad' })
    localidades: Localidad[];

    @OneToMany(() => LaboratorioClinico, laboratorioClinico => laboratorioClinico.zona)
    laboratoriosClinicos: LaboratorioClinico[];
    
    @OneToMany(() => CentroOdontologico, centro => centro.zona)
    centrosOdontologicos: CentroOdontologico[];

    @OneToMany(() => CentroOdontologico, centro => centro.zona)
    centrosOftalmologicos: CentroOftalmologico[];

    @OneToMany(() => ClinicaPrivada, centro => centro.zona)
    clinicasPrivadas: ClinicaPrivada[];

    @OneToMany(() => GrupoMedico, centro => centro.zona)
    gruposMedicos: GrupoMedico[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

}
