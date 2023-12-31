import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Car } from 'src/car/entities/car.entity';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
    async getCarPhotos(carId: string): Promise<Photo[]> {
        const car = await Car.findOne({where:{id:carId},relations:{photos:true}});
        if(!car) throw new HttpException("User doesn't exist!", HttpStatus.NOT_FOUND)
        return car.photos;
    }
    
    async uploadPhoto(file: Express.Multer.File,id: any){
        const car = await Car.findOne({where:{id:id},relations:{photos:true}});
        if(!car) throw new HttpException("User doesn't exist!", HttpStatus.NOT_FOUND)
        const newPhoto = new Photo();
        newPhoto.name = file.filename;
        newPhoto.describes = car;
        newPhoto.save();

        throw new HttpException({message:"Photo has been uploaded",name:file.filename}, HttpStatus.CREATED)    
      }

      async deletePhoto(carId:string, name:string):Promise<Photo[]>{
        const car = await Car.findOne({where:{id:carId},relations:{photos:true}});
        if(!car) throw new HttpException("Car doesn't exist!", HttpStatus.NOT_FOUND)
        let photosArray:Photo[] = [];
        let foundPhoto = false;
        car.photos.forEach(photo=>{
            if(photo.name!==name) photosArray.push(photo)
            else foundPhoto=true;
        });

        if(foundPhoto) {
            car.photos = photosArray;
            return photosArray;
        }
        else throw new HttpException("Photo doesn't exist in this Car Set!", HttpStatus.NOT_FOUND)
      }
  
}
