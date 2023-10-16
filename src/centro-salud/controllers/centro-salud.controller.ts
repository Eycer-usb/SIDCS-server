import { Controller, Get } from '@nestjs/common';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('centro-salud')
export class CentroSaludController {
    constructor( private centroSaludService: CentroSaludService ) { }
    @Get()
    async findAll() {
        return await this.centroSaludService.findAllCentrosDeSalud();
    }
}
