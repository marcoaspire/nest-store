import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helpers';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
      private readonly filesService: FilesService,
      private readonly configService: ConfigService
  ) {}

  @Post('product')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter,
    limits: {fieldSize:1000},
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    })
  }) )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file){
      throw new BadRequestException('Make sure the file is an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {secureUrl};

  }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ){

    const path =   this.filesService.getStaticProductImage(imageName);

    // res.status(403).json({
    //   ok: false,
    //   path
    // });

    res.sendFile(path);
  }

}
