import { Body, Controller, Get, Inject, Param, Post,Query,Req,UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { RegisterUserResponse } from 'src/interfaces/user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
    ApiBody,
    ApiConflictResponse,
    ApiConsumes,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
import { User } from './user.entity';
import { LocalisationGuard } from 'src/utils/localisation.guard';
import { ActivationGuard } from 'src/utils/activation.guard';

@ApiTags('user')
@Controller('user')
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
    @Get('/all')
    @UseGuards(JwtAuthGuard,LocalisationGuard,ActivationGuard)
    @ApiOperation({ summary: 'Get all existing users.' })
    @ApiOkResponse({ description: 'Users have been successfully fetched.'})
    @ApiUnauthorizedResponse({ description: 'Lack of permissions.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    getAll():Promise<[User[],number]>{
        return this.userService.getAll();
    }

    //Aktywacja konta
    @Get('activateAccount/:user_id')
    @ApiOperation({ summary: 'User account activation.' })
    @ApiOkResponse({ description: 'User account activated.'})
    @ApiNotFoundResponse({ description: 'User not found.'})
    activateAccount(
        @Param('user_id') id:string,
    ):Promise<any>{
        return this.userService.activateAccount(id);
    }
}
