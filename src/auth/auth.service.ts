import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Response } from 'express';
import {AuthLoginDto} from "./dto/auth-login.dto";
import {User} from "../user/user.entity";
import {hashPwd} from "../utils/hash-pwd";
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import {JwtPayload} from "./jwt.strategy";
import { Token } from 'src/user/token.entity';

@Injectable()
export class AuthService {
    private createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
        const payload: JwtPayload = { id: currentTokenId };
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, '8^&#.;nt@@dR%N9', { expiresIn });
        return {
            accessToken,
            expiresIn,
        };
    };

    private async generateToken(token): Promise<string> {
        let tokenId;
        let userWithThisToken = null;
        do {
            tokenId = uuid();
            userWithThisToken = await Token.findOneBy({currentToken:token});
            console.log(userWithThisToken);
        } while (!!userWithThisToken); 
        console.log(tokenId);
        const newToken = await Token.findOneBy({id:token});
        newToken.currentToken = tokenId;
        await newToken.save();
        return tokenId;
    };

    async login(req: AuthLoginDto, res: Response, headers:string, ip:string): Promise<any> {
            
        try {
            const user = await User.findOneBy({
                email: req.email,
            });
            if (!user) {
                throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
            }

            const hashPass = hashPwd(user.salt+req.password);

            if (user.pwdHash !== hashPass) {
                throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
            }
            const userData = {
                userId:user.id,
                role: user.role,
            }
            const newToken = await Token.createQueryBuilder("token")
            .leftJoinAndSelect('token.user', 'user')
            .where('user.id=:id',{id:user.id}).getOne();
            const calculatedFingerprint = hashPwd(`${ip}${headers['user-agent']}`);
            newToken.agent = calculatedFingerprint;
            await newToken.save();
            
            const token = await this.createToken(await this.generateToken(newToken.id));
            
            console.log("Zalogowano: ",req.email)
            
            return res
                .cookie('apitoken', token.accessToken, {
                    secure: false,
                    //domain: 'localhost',
                    httpOnly: true,
                })
                .json({ok: true, apitoken: token.accessToken, user: userData});
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    async logout(user: User, res: Response) {
        try {
            const token = await Token.createQueryBuilder("token")
            .leftJoinAndSelect('token.user', 'user')
            .where('user.id = :id',{id:user.id}).getOne();
            token.agent=null;
            token.currentToken=null;
            token.save();
            res.clearCookie(
                'apitoken',
                {
                    secure: false,
                    //domain: 'localhost',
                    httpOnly: true,
                }
            );
            console.log("Wylogowano!")

            return res.json({ok: true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }
}
