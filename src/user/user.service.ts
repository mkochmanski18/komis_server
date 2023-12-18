import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPwd } from 'src/utils/hash-pwd';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from 'src/interfaces/user';
import { Token } from './token.entity';

@Injectable()
export class UserService {
   

    regFilter(user:User):RegisterUserResponse{
        const {id, name, gender, email} = user;
        return {id,name,email};
    }
    nodemailer = require("nodemailer");
    mailTransport  = this.nodemailer.createTransport({
               pool: true,
               host: "mail2.small.pl",
               port: 25,
               auth: {
                   user: 'admin@mkochmanski.smallhost.pl',
                   pass: '8^&#.;nt@@dR%N9'
               }
               });

    async register(newUser:RegisterDto):Promise<RegisterUserResponse|any>{
            try{
            const checkemail = await User.findOne({
              where:{email:newUser.email}
            });
            const checkname = await User.findOne({
              where:{name:newUser.name}
            });
            if(checkemail){
              throw new HttpException('User already exists!', HttpStatus.CONFLICT);
            }
            else if(checkname){
              throw new HttpException('User name is taken!', HttpStatus.CONFLICT);
            }
            else{
                const {
                  randomBytes,
                } = require('node:crypto');
                const saltbuf = randomBytes(32).toString('hex');

                const user = new User();
                user.email = newUser.email;
                user.name = newUser.name;
                user.firstname = newUser.firstname;
                user.lastname = newUser.lastname;
                user.gender = newUser.gender;
                user.salt = saltbuf;
                user.pwdHash = hashPwd(saltbuf+newUser.pwd);
                
                await user.save();
                const token = new Token();
                token.user= user;
                token.save();
                console.log("Registered!");

                const result = await this.mailTransport.sendMail({
                  from:    '"SYSTEM" <admin@mkochmanski.smallhost.pl>',
                  to:      user.email,
                  subject: 'Account Activation',
                  text:    'Dziękujemy za rejestrację! W celu aktywacji przejdź na adres: http://mkochmanski.smallhost.pl:37738/user/activateAccount/'+user.id+'.Wiadomość została wygenerowana automatycznie. Proszę nie udzielać na nią odpowiedzi.',
                  html:    "<div style='text-align:center'><h4>Dziękujemy za rejestrację!</h4><p>W celu aktywacji kliknij w link poniżej:</p><a href='http://mkochmanski.smallhost.pl:37738/user/activateAccount/"+user.id+"'>Aktywuj konto</a><p>Wiadomość została wygenerowana automatycznie. Proszę nie udzielać na nią odpowiedzi</p></div>",
                })
                
                return this.regFilter(user);
            }
          }
          catch{throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)}
        }

        async getAll(): Promise<[User[],number]> {
          try{
            const users = await User.findAndCount({});
            return users;
          }
          catch{
            throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
          }
      }

      async activateAccount(id:string):Promise<any>{
        
        
          const user = await User.findOneBy({id,activated:false});
          if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
          }
          else{
            user.activated = true;
            user.save();
            throw new HttpException('Account activated', HttpStatus.OK)
          }
        
      }
      
}
