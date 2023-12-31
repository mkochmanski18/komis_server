import { Body, Controller, Get, Param, Post,Put,Req,UseGuards } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
  } from '@nestjs/swagger';
import { NewCarDto } from './dto/newCar.dto';
import { CarService } from './car.service';
import { UpdateCarDto } from './dto/updateCar.dto';
import { CarInterface } from 'src/interfaces/car';
import { Car } from './entities/car.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';
import { ReservationDto } from './dto/reservation.dto';
import { Equipment } from './entities/equipment.entity';


@ApiTags('car')
@Controller()
export class CarController {

    constructor(
        private carService: CarService
    ){}

    @Get('car')
    @UseGuards(JwtAuthGuard,ActivationGuard)
     @ApiOkResponse({ description: 'Objects fetched.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     fetchAll(
     ):Promise<CarInterface[]>{
         return this.carService.fetchAll();
     }

     @Get('car/rent')
     @UseGuards(JwtAuthGuard,ActivationGuard)
     @ApiOperation({ summary: 'Get all cars posible to rent.' })
     @ApiOkResponse({ description: 'Objects fetched.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     fetchByCreator(
     ):Promise<Car[]>{
         return this.carService.fetchRentalCars();
     }

     @Get('car/:carId')
     @UseGuards(JwtAuthGuard,ActivationGuard)
     @ApiOperation({ summary: 'Get car with certain id.' })
    @ApiOkResponse({ description: 'Object fetched.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    fetchOneCar(
        @Param('carId') carId:string
    ):Promise<Car>{
        return this.carService.fetchOneCar(carId);
    }

    @Get('equipment')
    @UseGuards(JwtAuthGuard,ActivationGuard)
    @ApiOperation({ summary: 'Get all car types' })
    @ApiOkResponse({ description: 'Object fetched.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    fetchAllEquipments():Promise<Equipment[]>{
        return this.carService.fetchAllEquipments();
    }

    @Post('equipment/:name')
    @UseGuards(JwtAuthGuard,ActivationGuard)
    @ApiOperation({ summary: 'Add new type' })
    @ApiOkResponse({ description: 'Object added.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    addEq(
        @Param('name') name:string
    ):Equipment{
        return this.carService.addEq(name);
    }

    @Post('car')
    @UseGuards(JwtAuthGuard,ActivationGuard)
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

    @Post('reservation')
    @UseGuards(JwtAuthGuard,ActivationGuard)
    @ApiOperation({ summary: 'Add new car to system.' })
    @ApiCreatedResponse({ description: 'Object added.'})
    @ApiConflictResponse({ description: 'Car is already reserved.'})
    @ApiNotFoundResponse({ description: 'User does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    makeReservation(
        @Req() req:any,
        @Body() resBody: ReservationDto,
    ):Promise<string>{
        return this.carService.makeReservation(req,resBody);
    }

    @Put('car')
    @UseGuards(JwtAuthGuard,ActivationGuard)
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
    @UseGuards(JwtAuthGuard,ActivationGuard)
    @ApiOperation({ summary: 'Update .' })
    @ApiCreatedResponse({ description: 'Object updated.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    updateOne(
        @Body() carBody: UpdateCarDto,
    ):Promise<string>{
        return this.carService.updateCar(carBody);
    }

    @Put('equipment/:carId')
    @UseGuards(JwtAuthGuard,ActivationGuard)
    @ApiOperation({ summary: 'ChangeCar equipment. Body is formed as array of equipment names.' })
    @ApiCreatedResponse({ description: 'Object updated.'})
    @ApiNotFoundResponse({ description: 'Car does not exist.'})
    @ApiBadRequestResponse({ description: 'Bad Request.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    updateCarEquipment(
        @Param('carId') carId:string,
        @Body() carEqBody: string[],
    ):Promise<Equipment[]>{
        return this.carService.updateCarEquipment(carId, carEqBody);
    }
    
}
