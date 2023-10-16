import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "../../localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class CentroOdontologico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.centrosOdontologicos, {eager: true})
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.centrosOdontologicos, { eager: true })
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.centroOdontologico, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
    imagenes: Imagen[];

    @Column( { type: 'numeric', precision: 5, scale: 2, default: 0 } )
    odontologiaGeneralDesde: number;

    @Column( { type: 'numeric', precision: 5, scale: 2, nullable: true } )
    odontologiaGeneralHasta?: number;

    @Column( { default: false } )
    ortodoncia: boolean;

    @Column( { default: false } )
    endodoncia: boolean;

    @Column( { default: false } )
    cirugiaBucal: boolean;

    @Column( { default: false } )
    protesis: boolean;

    @Column( { default: false } )
    rayosX: boolean;

}