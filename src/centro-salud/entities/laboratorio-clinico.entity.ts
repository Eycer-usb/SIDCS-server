import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class LaboratorioClinico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.laboratoriosClinicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.laboratoriosClinicos)
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.laboratorioClinico)
    imagenes: Imagen[];

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    hematologia_completa: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    perfil_20: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    perfil_tiroideo: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    urocultivo: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    heces: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    orina: number;

    @Column( { type: 'numeric', precision: 5, scale: 2 } )
    perfil_preoperatorio: number;
}