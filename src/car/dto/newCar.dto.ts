import { ApiProperty } from '@nestjs/swagger';
import { CarType } from 'src/enums/carType.enum';
import { Fuel } from 'src/enums/fuel.enum';
import { Gender } from 'src/enums/gender.enum';
import { Transmission } from 'src/enums/transmission.enum';

export class NewCarDto {
  
  @ApiProperty()
  make:string;

  @ApiProperty()
  model:string;

  @ApiProperty({ enum: Fuel, enumName: 'Fuel' })
  fuelType:Fuel;

  @ApiProperty()
  engine:string;
  
  @ApiProperty()
  power:string;

  @ApiProperty()
  kilometers:number;

  @ApiProperty({ enum: Transmission, enumName: 'Transmission' })
  transmission:Transmission;
  
  @ApiProperty()
  productionYear:number;

  @ApiProperty({ enum: CarType, enumName: 'CarType' })
  carType:CarType;
  
  @ApiProperty()
  seats:number;

  @ApiProperty()
  rentTotalCost:number;
}



 


