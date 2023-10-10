import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder } from '@nestjs/common';
import { LaboratorioClinicoService } from '../services/laboratorio-clinico.service';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe } from '@nestjs/common';
import { MaxFileSizeValidator } from '@nestjs/common';
import { FileTypeValidator } from '@nestjs/common';

@Controller('laboratorio-clinico')
export class LaboratorioClinicoController {
  constructor(private readonly centroSaludService: LaboratorioClinicoService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createLaboratorioClinicoDto: CreateLaboratorioClinicoDto,
          @UploadedFiles(
            new ParseFilePipe({
              validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
                new FileTypeValidator({ fileType: 'image' })
              ]
            })
          )
          images: Array<Express.Multer.File>) {
    return this.centroSaludService.create(createLaboratorioClinicoDto, images);
  }

  @Get()
  findAll() {
    return this.centroSaludService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroSaludService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    return this.centroSaludService.update(+id, updateLaboratorioClinicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroSaludService.remove(+id);
  }
}
