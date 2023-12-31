import { Controller, Get, Param, Put,Query,Req,UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { StandardUserInterface } from 'src/interfaces/user';
import { CarInterface } from 'src/interfaces/car';
import { Car } from 'src/car/entities/car.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';
import { RoleGuard } from 'src/utils/role.guard';

@ApiTags('administrator')
@Controller()
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
     ) {}

     @Get('administrator')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOperation({ summary: 'Fetch all users with admin role' })
     @ApiOkResponse({ description: 'Users fetched.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     getAdmins(
     ):Promise<StandardUserInterface[]>{
         return this.adminService.getAdmins();
     }  
     
     @Get('admin/all')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOkResponse({ description: 'Objects fetched.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     fetchAll(
     ):Promise<CarInterface[]>{
         return this.adminService.fetchAll();
     }
 
     @Get('admin/user/:userId')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOkResponse({ description: 'Objects fetched.'})
     @ApiNotFoundResponse({ description: 'User does not exist.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     fetchByCreator(
         @Param('userId') userId:string
     ):Promise<Car[]>{
         return this.adminService.fetchByCreator(userId);
     }

     @Put('role/:userId/:newRole')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOperation({ summary: 'Manage user roles' })
     @ApiCreatedResponse({ description: 'Objects updated.'})
     @ApiNotFoundResponse({ description: 'User does not exist.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     updateRole(
         @Param('userId') userId,
         @Param('newRole') newRole,
     ):Promise<string>{
         return this.adminService.updateRole(userId,newRole);
     }

     @Put('visibility/:carId/newValue')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOperation({ summary: 'Change car visibility' })
     @ApiCreatedResponse({ description: 'Objects updated.'})
     @ApiNotFoundResponse({ description: 'Car does not exist.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     updateVisibility(
         @Param('carId') carId,
         @Param('newValue') newValue,
     ):Promise<string>{
         return this.adminService.updateCarVisibility(carId,newValue);
     } 

     @Put('reservation/accept/:reservationId')
     @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard,RoleGuard)
     @ApiOperation({ summary: 'Change car visibility' })
     @ApiCreatedResponse({ description: 'Objects updated.'})
     @ApiNotFoundResponse({ description: 'Car does not exist.'})
     @ApiInternalServerErrorResponse({ description: 'Server error.'})
     acceptReservation(
         @Param('reservationId') resId:string,
         @Req() req:any,
     ):Promise<string>{
         return this.adminService.acceptReservation(req, resId);
     }
}
