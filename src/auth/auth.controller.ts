import {Body, Controller, Get, Headers, HostParam, Ip, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Response} from 'express';
import {AuthLoginDto} from "./dto/auth-login.dto";
import { JwtAuthGuard } from './jwt-auth.guard';
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
       private readonly authService: AuthService
    ) {}

    @Post('/login')
    @ApiOperation({ summary: 'After successful login, API respond with cookie, that contains jwt-token named apitoken. It is also included into body, that contains also userid and his role' })
    @ApiCreatedResponse({ description: 'Succesful login.'})
    @ApiForbiddenResponse({ description: 'Bad credentials.'})
    @ApiInternalServerErrorResponse({ description: 'Server error.'})
    async login(
        @Body() req: AuthLoginDto,
        @Res() res: Response,
        @Headers() headers: string,
        @Ip() ip:string,
    ): Promise<any> {
        return this.authService.login(req, res, headers, ip);
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@UserObj() user: User, @Res() res: Response) {
        return this.authService.logout(user, res);
    }
}
