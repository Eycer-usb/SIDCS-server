import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "../../localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class CentroOftalmologico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.centrosOftalmologicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.centrosOftalmologicos)
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.centroOftalmologico)
    imagenes: Imagen[];

    @Column( { type: 'numeric', precision: 5, scale: 2, default: 0 } )
    oftalmologiaGeneralDesde: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    odontologiaGeneralHasta?: number;

    @Column( { default: false } )
    tratamientoGlaucomaCataratas: boolean;

    @Column( { default: false } )
    protesisOculares: boolean;

    @Column( { default: false } )
    tratamientosEspecializados: boolean;

    @Column( { default: false } )
    oncologia: boolean;

    @Column( { type:"text" } )
    otros?: string;
}