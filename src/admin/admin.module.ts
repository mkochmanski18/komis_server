import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CarModule } from 'src/car/car.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
