import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "../../localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class CentroOftalmologico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.centrosOftalmologicos, { eager: true})
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.centrosOftalmologicos, { eager: true})
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.centroOftalmologico, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
    imagenes: Imagen[];

    @Column( { type: 'numeric', precision: 5, scale: 2, default: 0 } )
    oftalmologiaGeneralDesde: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    odontologiaGeneralHasta?: number;

    @Column( { default: false, nullable: true } )
    tratamientoGlaucomaCataratas: boolean;

    @Column( { default: false, nullable: true } )
    protesisOculares: boolean;

    @Column( { default: false, nullable: true } )
    tratamientosEspecializados: boolean;

    @Column( { default: false, nullable: true } )
    oncologia: boolean;

    @Column( { default:false, nullable:true } )
    otros: boolean;
}