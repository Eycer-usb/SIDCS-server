import { Entity, ManyToOne } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";

@Entity()
export class GrupoMedico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.gruposMedicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.gruposMedicos)
    zona: Zona;
}