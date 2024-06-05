import { AuthModule } from './auth.module';
import { AppController } from 'src/controller/app.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    CacheModule.register(),
    ConfigModule.forRoot(),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
