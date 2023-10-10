import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { LaboratorioClinico } from "./laboratorio-clinico.entity";
import { CentroOdontologico } from "./centro-odontologico.entity";
import { ClinicaPrivada } from "./clinica-privada.entity";
import { GrupoMedico } from "./grupo-medico.entity";

@Entity()
export class Imagen {
    @PrimaryColumn( { type: 'varchar' } )
    url: string;

    @ManyToOne(() => LaboratorioClinico, laboratorioClinico => laboratorioClinico.imagenes, { nullable: true })
    laboratorioClinico?: LaboratorioClinico;
    @ManyToOne(() => CentroOdontologico, centroOdontologico => centroOdontologico.imagenes, { nullable: true })
    centroOdontologico?: CentroOdontologico;
    @ManyToOne(() => ClinicaPrivada, clinicaPrivada => clinicaPrivada.imagenes, { nullable: true })
    clinicaPrivada?: ClinicaPrivada;
    @ManyToOne(() => GrupoMedico, grupoMedico => grupoMedico.imagenes, { nullable: true })
    grupoMedico?: GrupoMedico;

    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    @DeleteDateColumn()
    deleted_at?: Date;

}