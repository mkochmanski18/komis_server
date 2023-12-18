import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/enums/gender.enum';

export class RegisterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  gender:Gender;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  pwd:string;
}