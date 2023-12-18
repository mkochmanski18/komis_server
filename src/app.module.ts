import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pgsql2.small.pl',
      port: 5432,
      username: 'p1045_nestbase',
      password: '8^&#.;nt@@dR%N9',
      database: 'p1045_nestbase',
      entities: ["dist/**/**.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    UserModule
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
