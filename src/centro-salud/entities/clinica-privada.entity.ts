import { Entity, ManyToOne } from "typeorm";
import { CentroSalud } from "./centro-salud.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Zona } from "src/zona/entities/zona.entity";

@Entity()
export class ClinicaPrivada extends CentroSalud {
    @ManyToOne(() => Localidad, localidad => localidad.clinicasPrivadas)
    localidad: Localidad;
    @ManyToOne(() => Zona, zona => zona.clinicasPrivadas)
    zona: Zona;
}