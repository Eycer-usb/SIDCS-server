import { Entity, ManyToOne } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "../../localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";

@Entity()
export class CentroOdontologico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.centrosOdontologicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.centrosOdontologicos)
    zona: Zona;
}