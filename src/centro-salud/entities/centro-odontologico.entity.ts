import { Entity, ManyToOne, OneToMany } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "../../localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";
import { Imagen } from "./imagen.entity";

@Entity()
export class CentroOdontologico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.centrosOdontologicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.centrosOdontologicos)
    zona: Zona;
    @OneToMany(() => Imagen, imagen => imagen.centroOdontologico)
    imagenes: Imagen[];
}