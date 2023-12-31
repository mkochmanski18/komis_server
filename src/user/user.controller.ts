import { Body, Controller, Get, Inject, Param, Post,UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { RegisterUserResponse, StandardUserInterface } from 'src/interfaces/user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiOperation,
    ApiTags,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';

@ApiTags('user')
@Controller()
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ){}
 
    //Rejestracja Użytkownika
    @Post('/register')
    @ApiCreatedResponse({ description: 'Succesful registration.'})
    @ApiConflictResponse({ description: 'Resource is already used.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    register(
        @Body() newUser: RegisterDto,
    ):Promise<RegisterUserResponse>{
        return this.userService.register(newUser);
    }

    //Wszyscy użytkownicy
    @Get('user/all')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Get all existing users.' })
    @ApiOkResponse({ description: 'Users have been successfully fetched.'})
    @ApiUnauthorizedResponse({ description: 'Lack of permissions.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    getAll():Promise<StandardUserInterface[]>{
        return this.userService.getAll();
    }

    //Jeden
    @Get('user/1/:userId')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Get certain user.' })
    @ApiOkResponse({ description: 'User has been successfully fetched.'})
    @ApiUnauthorizedResponse({ description: 'Lack of permissions.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    getOne(
        @Param('userId') userId:string,
    ):Promise<StandardUserInterface>{
        return this.userService.getOne(userId);
    }

    //Aktywacja konta
    @Get('user/activateAccount/:user_id')
    @ApiOperation({ summary: 'User account activation.' })
    @ApiOkResponse({ description: 'User account activated.'})
    @ApiNotFoundResponse({ description: 'User not found.'})
    activateAccount(
        @Param('user_id') id:string,
    ):Promise<any>{
        return this.userService.activateAccount(id);
    }
}
