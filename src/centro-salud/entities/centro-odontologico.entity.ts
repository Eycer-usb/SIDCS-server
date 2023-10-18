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

    @Column( { default: false, nullable:true } )
    ortodoncia: boolean;

    @Column( { default: false, nullable:true } )
    endodoncia: boolean;

    @Column( { default: false, nullable:true } )
    cirugiaBucal: boolean;

    @Column( { default: false, nullable:true } )
    protesis: boolean;

    @Column( { default: false, nullable:true } )
    rayosX: boolean;

}