import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { hashPwd } from './hash-pwd';
import { Token } from 'src/user/entities/token.entity';

@Injectable()
export class LocalisationGuard implements CanActivate {
    constructor(
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = context.switchToHttp().getRequest();

        const userAgent = ctx.headers['user-agent'];
        const ip = ctx.headers['x-forwarded-for']||ctx.socket.remoteAddress;
        const user = ctx.user;
        const token =await  Token.createQueryBuilder("token")
        .leftJoinAndSelect('token.user', 'user')
        .where('user.id=:id',{id:user.id}).getOne();

        const calculatedFingerprint = hashPwd(`${ip}${userAgent}`);
        if (token.agent !== calculatedFingerprint) {
            throw new UnauthorizedException();
        }
        return true;
  }
}