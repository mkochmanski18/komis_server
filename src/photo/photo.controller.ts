import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { Photo } from './photo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';

@ApiTags('photo')
@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

    @UseGuards(JwtAuthGuard,ActivationGuard)
    @Get('photo/1/:photoname')
    @ApiOperation({ summary: 'Get car photo' })
    @ApiResponse({ status: 200, description: 'Photo has been uploaded'})
    @ApiResponse({ status: 404, description: "Photo doesn't exist!"})
    @ApiResponse({ status: 500, description: 'Internal server error'})
    getPhoto(
        @Param('photoname') photo:string,
        @Res() res) {
            return res.sendFile(photo, { root: './assets/car-images' });
    }

    @UseGuards(JwtAuthGuard,ActivationGuard)
    @Get('photo/:carId')
    @ApiOperation({ summary: 'Get car photo names' })
    @ApiResponse({ status: 200, description: 'Photos have been fetched'})
    @ApiResponse({ status: 404, description: "User doesn't exist!"})
    @ApiResponse({ status: 500, description: 'Internal server error'})
    getCarPhotos(
        @Param('carId') carId:string
    ):Promise<Photo[]>{
        return this.photoService.getCarPhotos(carId);
    }

    @UseGuards(JwtAuthGuard,ActivationGuard)
    @Post('photo/:carId')
    @ApiResponse({ status: 201, description: 'Photo has been uploaded'})
    @ApiResponse({ status: 404, description: "User doesn't exist!"})
    @ApiResponse({ status: 500, description: 'Internal server error'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'base64',
            },
          },
        },
      })
    @ApiOperation({ summary: 'Upload car photo' })
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination:'./assets/car-images',

            filename:editFileName,
        })
    }))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param("carId") carId:string,
        ){
            return this.photoService.uploadPhoto(file,carId);
    }

    @UseGuards(JwtAuthGuard,ActivationGuard)
    @Delete('photo/:carId/:photoName')
    @ApiOperation({ summary: 'Delete car photo' })
    @ApiResponse({ status: 200, description: 'Photo has been uploaded'})
    @ApiResponse({ status: 404, description: "Object doesn't exist!"})
    @ApiResponse({ status: 500, description: 'Internal server error'})
    deletePhoto(
        @Param('carId') carId:string,
        @Param('photoName') name:string
    ):Promise<Photo[]>{
        return this.photoService.deletePhoto(carId,name);
    }
}
