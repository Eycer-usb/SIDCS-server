import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LaboratorioClinico } from "./laboratorio-clinico.entity";
import { CentroOdontologico } from "./centro-odontologico.entity";
import { ClinicaPrivada } from "./clinica-privada.entity";
import { GrupoMedico } from "./grupo-medico.entity";
import { CentroOftalmologico } from "./centro-oftalmologico.entity";

@Entity()
export class Imagen {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type: 'varchar' } )
    url: string;

    @ManyToOne(() => LaboratorioClinico, laboratorioClinico => laboratorioClinico.imagenes, { nullable: true })
    laboratorioClinico?: LaboratorioClinico;
    @ManyToOne(() => CentroOdontologico, centroOdontologico => centroOdontologico.imagenes, { nullable: true })
    centroOdontologico?: CentroOdontologico;
    @ManyToOne(() => ClinicaPrivada, clinicaPrivada => clinicaPrivada.imagenes, { nullable: true })
    clinicaPrivada?: ClinicaPrivada;
    @ManyToOne(() => GrupoMedico, grupoMedico => grupoMedico.imagenes, { nullable: true })
    grupoMedico?: GrupoMedico;
    @ManyToOne(() => CentroOftalmologico, centroOftalmologico => centroOftalmologico.imagenes, { nullable: true })
    centroOftalmologico?: CentroOftalmologico;

    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
}