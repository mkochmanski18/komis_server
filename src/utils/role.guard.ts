import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        ) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
        const ctx = context.switchToHttp().getRequest();
        const role = ctx.user.role;
        
        if (role !== 3) {
            throw new UnauthorizedException();
        }
        return true;
  }
}