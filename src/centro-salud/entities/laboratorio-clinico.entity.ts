import { Entity, ManyToOne } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";

@Entity()
export class LaboratorioClinico extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.laboratoriosClinicos)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.laboratoriosClinicos)
    zona: Zona;
}