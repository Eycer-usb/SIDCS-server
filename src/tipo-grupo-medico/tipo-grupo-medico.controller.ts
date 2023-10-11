import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoGrupoMedicoService } from './tipo-grupo-medico.service';
import { CreateTipoGrupoMedicoDto } from './dto/create-tipo-grupo-medico.dto';
import { UpdateTipoGrupoMedicoDto } from './dto/update-tipo-grupo-medico.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('zona')
export class TipoGrupoMedicoController {
  constructor(private readonly tipoService: TipoGrupoMedicoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTipoGrupoMedicoDto: CreateTipoGrupoMedicoDto) {
    return this.tipoService.create(createTipoGrupoMedicoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.tipoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tipoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTipoGrupoMedicoDto: UpdateTipoGrupoMedicoDto) {
    return this.tipoService.update(+id, updateTipoGrupoMedicoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tipoService.remove(+id);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.tipoService.restore(+id);
  }
}
