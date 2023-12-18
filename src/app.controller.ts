import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalisationGuard } from './utils/localisation.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
}
