import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Token } from 'src/user/token.entity';

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.apitoken?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: '8^&#.;nt@@dR%N9',
        });
    }
    
    async validate(payload: JwtPayload,done: (error, user) => void) {
        
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }
        const {user} = await Token.createQueryBuilder("token")
            .leftJoinAndSelect('token.user', 'user')
            .where('token.currentToken=:token',{token:payload.id}).getOne();
        

        if (!user ) {
            return done(new UnauthorizedException(), false);
         }
        done(null, user);
    }
}


