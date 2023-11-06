import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('centro-salud')
export class CentroSaludController {
    constructor( private centroSaludService: CentroSaludService ) { }
    @Post()
    async find(@Body() body: any) {
        return await this.centroSaludService.findQuery(body.body);
    }
}
