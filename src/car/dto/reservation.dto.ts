import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  
  @ApiProperty()
  carId:string;

  @ApiProperty()
  monthlyCost:number;

  @ApiProperty()
  reservationBeginDate:Date;

  @ApiProperty()
  reservationEndDate:Date;
}



 


