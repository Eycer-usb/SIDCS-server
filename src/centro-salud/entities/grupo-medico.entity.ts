import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";
import { TipoGrupoMedico } from "src/tipo-grupo-medico/entities/tipo-grupo-medico.entity";

@Entity()
export class GrupoMedico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.gruposMedicos, {eager: true})
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.gruposMedicos, {eager: true})
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.grupoMedico, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
    imagenes: Imagen[];
    @ManyToOne(() => TipoGrupoMedico, tipo => tipo.gruposMedicos, {eager: true})
    tipo: TipoGrupoMedico;


    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    medicinaGeneral?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    medicinaInterna?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    pediatria?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    ginecologia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    obstetricia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    cardiologia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    gastro?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    neurologia?: number;
    
    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    neumonologia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    medicinaFyR?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    psiquiatria?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    psicologia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    rayosXDeTorax?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    tomografiaAbdominalPelvica?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    resonanciaCerebral?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    ecoAbdominal?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    mamografia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    densitometriaOsea?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    epirometria?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    eeg?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    laparoscopiaAbdominal?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    pruebaDeEsfuerzoCardio?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    hematologiaCompleta?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    perfil20?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    perfilTiroideo?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    urocultivo?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    heces?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    orina?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    perfilPreoperatorio?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    apendicectomia?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    colicistectomiaLamparoscopica?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    herniorrafiaIngiunal?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    cesarea?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    partoNormal?: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    hospitalizacion?: number;

}