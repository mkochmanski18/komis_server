import { ApiProperty } from '@nestjs/swagger';
import { CarType } from 'src/enums/carType.enum';
import { Fuel } from 'src/enums/fuel.enum';
import { Transmission } from 'src/enums/transmission.enum';

export class UpdateCarDto {

  @ApiProperty()
  carId:string;
  
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



 


