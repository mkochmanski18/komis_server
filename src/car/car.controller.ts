import { Body, Controller, Get, Param, Post,Put,Req,UseGuards } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
import { NewCarDto } from './dto/newCar.dto';
import { CarService } from './car.service';
import { UpdateCarDto } from './dto/updateCar.dto';
import { CarInterface } from 'src/interfaces/car';
import { Car } from './car.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';
import { ReservationDto } from './dto/reservation.dto';

@ApiTags('car')
@Controller()
export class CarController {

    constructor(
        private carService: CarService
    ){}

    @Get('car')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
     @ApiOkResponse({ description: 'Objects fetched.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     fetchAll(
     ):Promise<CarInterface[]>{
         return this.carService.fetchAll();
     }

     @Get('car/:carId')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
     @ApiOperation({ summary: 'Get car with certain id.' })
    @ApiOkResponse({ description: 'Object fetched.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    fetchOneCar(
        @Param('carId') carId:string
    ):Promise<Car>{
        return this.carService.fetchOneCar(carId);
    }

    @Post('car')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Add new car to system.' })
    @ApiCreatedResponse({ description: 'Object added.'})
    @ApiNotFoundResponse({ description: 'User does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    createCar(
        @Body() carBody: NewCarDto,
        @Req() req:any,
    ):Promise<string>{
        return this.carService.newCar(carBody,req);
    }

    @Put('car')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Update using the same array, made of schemas of single update request.' })
    @ApiCreatedResponse({ description: 'Objects updated.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    updateMany(
        @Body() carBody: UpdateCarDto[],
    ):Promise<string>{
        return this.carService.updateCar(carBody);
    }

    @Put('car/1')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Update .' })
    @ApiCreatedResponse({ description: 'Object updated.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    updateOne(
        @Body() carBody: UpdateCarDto,
    ):Promise<string>{
        return this.carService.updateCar(carBody);
    }


    

    
}
