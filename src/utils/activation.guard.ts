import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ActivationGuard implements CanActivate {
    constructor(
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = context.switchToHttp().getRequest();
        const user = ctx.user;
        if (!user.activated) {
            throw new UnauthorizedException();
        }
        return true;
  }
}