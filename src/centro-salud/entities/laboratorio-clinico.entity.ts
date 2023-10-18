import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class LaboratorioClinico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.laboratoriosClinicos, { eager: true })
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.laboratoriosClinicos, { eager: true })
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.laboratorioClinico, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true })
    imagenes: Imagen[];

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
}