import { ApiProperty } from '@nestjs/swagger';
import { Fuel } from 'src/enums/fuel.enum';
import { Transmission } from 'src/enums/transmission.enum';

export class UpdateCarDto {

  @ApiProperty()
  carId:string;
  
  @ApiProperty()
  make:string;

  @ApiProperty()
  model:string;

  @ApiProperty()
  fuelType:Fuel;

  @ApiProperty()
  engine:string;
  
  @ApiProperty()
  power:string;

  @ApiProperty()
  kilometers:number;

  @ApiProperty()
  transmission:Transmission;
  
  @ApiProperty()
  productionYear:number;
  
  @ApiProperty()
  seats:number;

  @ApiProperty()
  rentTotalCost:number;
  
}



 


