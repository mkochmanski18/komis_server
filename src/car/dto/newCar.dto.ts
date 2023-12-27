import { ApiProperty } from '@nestjs/swagger';
import { Fuel } from 'src/enums/fuel.enum';
import { Gender } from 'src/enums/gender.enum';
import { Transmission } from 'src/enums/transmission.enum';

export class NewCarDto {
  
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



 


