import { Controller, Get, Query } from '@nestjs/common';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('centro-salud')
export class CentroSaludController {
    constructor( private centroSaludService: CentroSaludService ) { }
    @Get()
    async find(@Query() query: any) {
        return await this.centroSaludService.findQuery(query);
    }
}
